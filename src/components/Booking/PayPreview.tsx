import { differenceInCalendarDays } from "date-fns";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { calculateTotalPrice, convertCentsIntoDollars } from "~/utils/booking";
import { api } from "~/utils/api";
import { useBookingContext } from "~/context/BookingContext";

import type { DateRange } from "react-day-picker";
import type { RouterOutputs } from "~/utils/api";
import OpenModalButton from "../Modal/OpenModalButton";
import ConfirmRulesModal from "../Modal/ConfirmRulesModal";

type StripePriceType = RouterOutputs["stripe"]["createPriceForBooking"];

const PayPreview = ({ selected }: { selected: DateRange }) => {
    const router = useRouter();
    const { data: session } = useSession();
    const { setBooking } = useBookingContext();

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
        <div className="flex w-full flex-col justify-between border-l-2 border-slate-200 bg-white p-5 pl-14 text-xl text-black">
            <h2 className="text-center text-3xl font-semibold">
                Booking Preview
            </h2>

            <div className="w-3/4 self-center border border-slate-200" />

            <span className="flex justify-between">
                <p>Check-in: </p> <p>{selected.from?.toLocaleDateString()}</p>
            </span>

            <span className="flex justify-between">
                <p>Check-out: </p> <p>{selected.to?.toLocaleDateString()}</p>
            </span>

            <div className="w-3/4 self-center border border-slate-200" />

            <span className="flex justify-between">
                <p>Total: </p> <p>{totalPrice}</p>
            </span>

            <div className="flex justify-center">
                {/* <button
                    onClick={startBookingCreation}
                    disabled={disabled}
                    className="rounded-lg bg-blue-500 px-4 py-2 text-white transition-all duration-200 hover:scale-105 hover:bg-blue-600 disabled:bg-slate-300 disabled:text-slate-500"
                >
                    Continue
                </button> */}
                <OpenModalButton
                    modalComponent={<ConfirmRulesModal />}
                    buttonText="Continue"
                    className="rounded-lg bg-blue-500 px-4 py-2 text-white transition-all duration-200 hover:scale-105 hover:bg-blue-600 disabled:scale-100 disabled:bg-slate-300 disabled:text-slate-500"
                    disabled={disabled}
                    onModalSubmit={startBookingCreation}
                    onModalClose={() => {
                        return "Hey";
                    }}
                />
            </div>
        </div>
    );
};

export default PayPreview;
