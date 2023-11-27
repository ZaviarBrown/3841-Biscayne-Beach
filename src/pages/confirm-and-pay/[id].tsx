import { useRouter } from "next/router";
import BookingCard from "~/components/Booking/Card";
import {
    EmbeddedCheckoutProvider,
    EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { api } from "~/utils/api";
import { loadStripe } from "@stripe/stripe-js";
import { env } from "~/env.mjs";
import { useEffect, useState } from "react";
import { useBookingContext } from "~/context/BookingContext";

import type { BookingContextType } from "~/context/BookingContext";

// TODO: getServerSideProps

// TODO: This is a hot mess please refactor this dear god

const stripePromise = loadStripe(env.NEXT_PUBLIC_STRIPE_PUBLIC);

const formatTimeLeft = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

export default function ConfirmAndPay() {
    const router = useRouter();
    const [clientSecret, setClientSecret] = useState("");

    const { booking, setBooking, timeLeft } =
        useBookingContext() as BookingContextType;

    const { data: restoreBooking, isLoading } = api.booking.getById.useQuery(
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

    useEffect(() => {
        if (!booking && restoreBooking) {
            setBooking(restoreBooking);
        }
    }, [booking, restoreBooking, setBooking]);

    if (isLoading) return <div>Loading...</div>;

    if (!booking && !restoreBooking) {
        void router.push("/");
        return null;
    }

    if (!booking) return <div>Loading...</div>;

    if (!clientSecret) return <div>Loading...</div>;

    return (
        <div className="flex">
            <h1 className="text-4xl">{formatTimeLeft(timeLeft)}</h1>

            <div className="text-center">
                <h1 className="text-3xl">Confirm and pay</h1>
                <BookingCard {...booking} />
            </div>
            <div>
                {clientSecret && (
                    <EmbeddedCheckoutProvider
                        stripe={stripePromise}
                        options={{ clientSecret }}
                    >
                        <EmbeddedCheckout />
                    </EmbeddedCheckoutProvider>
                )}
            </div>
        </div>
    );
}
