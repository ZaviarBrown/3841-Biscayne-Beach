import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { api } from "~/utils/api";

export default function StripeReturn() {
    const [status, setStatus] = useState("");
    const [customerEmail, setCustomerEmail] = useState("");
    const router = useRouter();

    const { data: checkoutSession } = api.stripe.getCheckoutSession.useQuery(
        router.query.session_id as string,
        { enabled: !!router.query.session_id }
    );

    useEffect(() => {
        if (checkoutSession) {
            setStatus(checkoutSession.status ?? "");
            setCustomerEmail(checkoutSession.customer_email ?? "");
        }
    }, [checkoutSession]);

    if (status === "open") {
        return router.push("/");
    }

    if (status === "complete") {
        return (
            <section
                className="m-auto text-center text-3xl text-white"
                id="success"
            >
                <p>We appreciate you booking with us!</p>
                <p>A confirmation email will be sent to {customerEmail}</p>

                <p>
                    If you have any questions, please email
                    <a
                        className="text-blue-300 underline underline-offset-4"
                        href="mailto:lynnthompson001@gmail.com"
                    >
                        {" "}
                        lynnthompson001@gmail.com
                    </a>
                </p>
            </section>
        );
    }

    return null;
}
