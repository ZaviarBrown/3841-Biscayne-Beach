import { differenceInCalendarDays } from "date-fns";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { calculateTotalPrice, convertCentsIntoDollars } from "~/utils/booking";
import { api } from "~/utils/api";
import { useBookingContext } from "~/context/BookingContext";

import type { DateRange } from "react-day-picker";
import type { RouterOutputs } from "~/utils/api";
import type { BookingContextType } from "~/context/BookingContext";

type StripePriceType = RouterOutputs["stripe"]["createPriceForBooking"];

const PayPreview = ({ selected }: { selected: DateRange }) => {
    const router = useRouter();
    const { data: session } = useSession();
    const { setBooking } = useBookingContext() as BookingContextType;

    const [disabled, setDisabled] = useState(true);
    const [totalPrice, setTotalPrice] = useState("...");
    const [numberOfNights, setNumberOfNights] = useState(0);
    const [stripePrice, setStripePrice] = useState<StripePriceType>();

    const { data: prices } = api.pricing.getAllValidWindows.useQuery();

    const { mutate: createStripePrice } =
        api.stripe.createPriceForBooking.useMutation({
            onSuccess: (data) => {
                setStripePrice(data);
            },
        });

    const { mutate: createPendingBooking } = api.booking.create.useMutation({
        onSuccess: (data) => {
            setBooking(data);
            void router.push(`/confirm-and-pay/${data.id}`);
        },
    });

    const startBookingCreation = (): void => {
        const { from, to } = selected;

        if (from && to) {
            createStripePrice({
                startDate: from,
                endDate: to,
                priceInUSD: totalPrice,
            });
        }
    };

    useEffect(() => {
        const { from, to } = selected;

        if (stripePrice && session && session.user && from && to) {
            createPendingBooking({
                userId: session.user.id,
                name: session.user.name ?? "",
                email: session.user.email ?? "",
                startDate: from,
                endDate: to,
                priceId: stripePrice.id,
                numberOfNights,
            });
        }
    }, [stripePrice, session, numberOfNights, selected, createPendingBooking]);

    useEffect(() => {
        const { from, to } = selected;

        if (!(from && to)) {
            setDisabled(true);
            setTotalPrice("...");
        } else {
            if (numberOfNights < 5) {
                setDisabled(true);
                setTotalPrice("...");
            } else if (prices) {
                const cents = calculateTotalPrice(prices, { from, to });

                setDisabled(false);
                setTotalPrice(convertCentsIntoDollars(cents));
            }
        }
    }, [selected, prices, numberOfNights]);

    useEffect(() => {
        const { from, to } = selected;
        if (from && to) setNumberOfNights(differenceInCalendarDays(to, from));
        else setNumberOfNights(0);
    }, [selected]);

    return (
        <div className="flex w-1/6 scale-125 transform flex-col justify-between rounded-lg bg-white p-4 text-slate-800 shadow-3xl">
            <h2 className="text-center text-lg font-semibold">
                Booking Preview
            </h2>

            <p>Arrive on: {selected.from?.toLocaleDateString()}</p>

            <p>Depart on: {selected.to?.toLocaleDateString()}</p>

            {numberOfNights ? (
                <p>
                    {numberOfNights + 1} days, {numberOfNights} night
                    {numberOfNights > 1 ? "s" : ""}
                </p>
            ) : null}

            <p>Total: {totalPrice}</p>

            <div className="mt-4 flex justify-center">
                <button
                    onClick={startBookingCreation}
                    disabled={disabled}
                    className="rounded-lg bg-blue-500 px-4 py-2 text-white transition-all duration-200 hover:scale-105 hover:bg-blue-600 disabled:bg-slate-300 disabled:text-slate-500"
                >
                    Continue
                </button>
            </div>
        </div>
    );
};

export default PayPreview;
