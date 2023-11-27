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
            <section id="success">
                <p>
                    We appreciate your business! A confirmation email will be
                    sent to {customerEmail}. If you have any questions, please
                    email{" "}
                    <a href="mailto:orders@example.com">orders@example.com</a>.
                </p>
            </section>
        );
    }

    return null;
}
