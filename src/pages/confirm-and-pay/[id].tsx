import { useRouter } from "next/router";
import BookingCard from "~/components/Booking/Card";
import DisplayBookings from "~/components/Booking/Display";
import {
    EmbeddedCheckoutProvider,
    EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { api } from "~/utils/api";
import { loadStripe } from "@stripe/stripe-js";
import { env } from "~/env.mjs";
import { useEffect, useState } from "react";

// TODO: getServerSideProps

const stripePromise = loadStripe(env.NEXT_PUBLIC_STRIPE_PUBLIC);

export default function ConfirmAndPay() {
    const router = useRouter();
    const [clientSecret, setClientSecret] = useState("");

    const { data: booking, isLoading } = api.booking.getById.useQuery(
        router.query.id as string,
        { enabled: !!router.query.id }
    );

    const { mutate: createCheckout } =
        api.stripe.createCheckoutSession.useMutation({
            onSuccess: (checkoutSession) => {
                setClientSecret(checkoutSession.client_secret ?? "");
            },
        });

    useEffect(() => {
        if (booking && !clientSecret) {
            createCheckout(booking);
        }
    }, [booking, clientSecret, createCheckout]);

    if (isLoading) return <div>Loading...</div>;

    if (!booking) return router.push("/");

    return (
        <>
            <h1 className="text-3xl">Confirm and pay</h1>
            <BookingCard {...booking} />

            {clientSecret && (
                <EmbeddedCheckoutProvider
                    stripe={stripePromise}
                    options={{ clientSecret }}
                >
                    <EmbeddedCheckout />
                </EmbeddedCheckoutProvider>
            )}
        </>
    );
}
