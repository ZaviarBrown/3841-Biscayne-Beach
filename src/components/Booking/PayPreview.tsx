import { differenceInCalendarDays } from "date-fns";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { calculateSubtotal, convertCentsIntoDollars } from "~/utils/booking";
import { api } from "~/utils/api";
import { useBookingContext } from "~/context/BookingContext";

import type { DateRange } from "react-day-picker";
import type { RouterOutputs } from "~/utils/api";
import OpenModalButton from "../Modal/OpenModalButton";
import ConfirmRulesModal from "../Modal/ConfirmRulesModal";
import { env } from "~/env.mjs";

type StripePriceType = RouterOutputs["stripe"]["createPriceForBooking"];

const PayPreview = ({ selected }: { selected: DateRange }) => {
    const router = useRouter();
    const { data: session } = useSession();
    const { setBooking } = useBookingContext();

    const [disabled, setDisabled] = useState(true);
    const [subTotal, setSubTotal] = useState("...");
    const [taxPrice, setTaxPrice] = useState("...");
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

        if (
            to &&
            from &&
            session &&
            stripePrice &&
            session.user &&
            stripePrice.unit_amount
        ) {
            createPendingBooking({
                userId: session.user.id,
                name: session.user.name ?? "",
                email: session.user.email ?? "",
                startDate: from,
                endDate: to,
                priceId: stripePrice.id,
                price: stripePrice.unit_amount,
                numberOfNights,
            });
        }
    }, [stripePrice, session, numberOfNights, selected, createPendingBooking]);

    useEffect(() => {
        const { from, to } = selected;

        if (!(from && to)) {
            setDisabled(true);
            setTotalPrice("...");
            setSubTotal("...");
            setTaxPrice("...");
        } else {
            if (numberOfNights < 5) {
                setDisabled(true);
                setTotalPrice("...");
                setSubTotal("...");
                setTaxPrice("...");
            } else if (prices) {
                const subInCents = calculateSubtotal(prices, { from, to });
                const taxInCents =
                    subInCents * Number(env.NEXT_PUBLIC_TAX_RATE);
                const totalInCents = subInCents + taxInCents;

                setDisabled(false);
                setSubTotal(convertCentsIntoDollars(subInCents));
                setTaxPrice(convertCentsIntoDollars(taxInCents));
                setTotalPrice(convertCentsIntoDollars(totalInCents));
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
            <div>
                <h2 className="text-center text-3xl font-semibold">
                    Booking Preview
                </h2>
                <h3
                    className={`text-center text-xl italic transition-all duration-200 ${
                        disabled &&
                        selected.from &&
                        selected.to &&
                        totalPrice === "..."
                            ? "scale-110 font-bold text-red-600"
                            : "scale-100 font-normal"
                    }`}
                >
                    5 night minimum
                </h3>
            </div>
            <div className="w-3/4 self-center border border-slate-200" />

            <span className="flex flex-wrap justify-between">
                <p>Check-in: </p> <p>{selected.from?.toLocaleDateString()}</p>
            </span>

            <span className="flex flex-wrap justify-between">
                <p>Check-out: </p> <p>{selected.to?.toLocaleDateString()}</p>
            </span>

            <div className="w-3/4 self-center border border-slate-200" />

            <span className="flex flex-wrap justify-between">
                <p>Subtotal: </p> <p>{subTotal}</p>
            </span>

            <span className="flex flex-wrap justify-between">
                <p>Tax: </p> <p>{taxPrice}</p>
            </span>

            <span className="flex flex-wrap justify-between">
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
                    onModalClose={() => null}
                />
            </div>
        </div>
    );
};

export default PayPreview;
