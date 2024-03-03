import { render } from "@react-email/render";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import BookingConfirmationEmail from "~/emails/BookingConfirmation";
import { api } from "~/utils/api";

export default function StripeReturn() {
    const router = useRouter();
    const [status, setStatus] = useState("");
    const [customerEmail, setCustomerEmail] = useState("");
    const [emailSent, setEmailSent] = useState(false);

    const { data: checkoutSession } = api.stripe.getCheckoutSession.useQuery(
        router.query.session_id as string,
        { enabled: !!router.query.session_id }
    );

    const { data: booking } = api.booking.getById.useQuery(
        router.query.booking_id as string,
        { enabled: !!router.query.booking_id }
    );

    const { mutate: updateBooking } = api.booking.update.useMutation();

    const { mutate: sendEmail } = api.contact.confirmationEmail.useMutation({
        onSuccess: () => {
            booking &&
                checkoutSession &&
                updateBooking({
                    id: booking.id,
                    userId: booking.userId,
                    status: "complete",
                    paymentId: checkoutSession.paymentIntent as string,
                });
        },
    });

    useEffect(() => {
        if (checkoutSession) {
            setStatus(checkoutSession.status ?? "");
            setCustomerEmail(checkoutSession.customerEmail ?? "");
        }
    }, [checkoutSession]);

    useEffect(() => {
        if (
            !emailSent &&
            status === "complete" &&
            booking?.status === "pending"
        ) {
            sendEmail({
                to: booking.email,
                subject: "Booking Confirmation",
                html: render(<BookingConfirmationEmail {...booking} />),
            });

            setEmailSent(true);
        }
    }, [status, booking, emailSent, sendEmail]);

    if (status === "open") {
        return router.replace("/");
    }

    if (booking && status === "complete") {
        return (
            <section
                className="m-auto text-center text-xl text-white md:text-3xl"
                id="success"
            >
                <p className="break-words">
                    We appreciate you booking with us!
                </p>
                <p className="break-words">
                    A confirmation email will be sent to {customerEmail}
                </p>

                <p className="break-words">
                    If you have any questions, please email
                    <a
                        className="break-all text-blue-300 underline underline-offset-4"
                        href="mailto:contact@3841biscaynebeach.com"
                    >
                        {" "}
                        contact@3841biscaynebeach.com
                    </a>
                </p>
            </section>
        );
    }

    return null;
}
