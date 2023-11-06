import {
    differenceInCalendarDays,
    isWithinInterval,
    isBefore,
    isAfter,
} from "date-fns";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import type { DateRange } from "react-day-picker";
import { api } from "~/utils/api";
import type { RouterOutputs } from "~/utils/api";

type PricesType = RouterOutputs["stripe"]["getAllPrices"];

const findPricingWindow = (start: Date, end: Date, prices: PricesType) => {
    let finalPrice = { id: "...", price: 0 };

    for (const { id, defaultPrice, startDate, endDate, price } of prices) {
        if (defaultPrice) finalPrice = { id, price };
        else if (startDate && endDate) {
            // Check if selected start is within existing pricing window
            if (isWithinInterval(startDate, { start, end }))
                return { id, price };

            // Check if selected end is within existing pricing window
            if (isWithinInterval(endDate, { start, end })) return { id, price };

            // Check if selected times surround existing pricing window
            if (isBefore(start, startDate) && isAfter(end, endDate))
                return { id, price };
        }
    }

    return finalPrice;
};

const PayPreview = ({ selected }: { selected: DateRange }) => {
    const router = useRouter();
    const { data: session } = useSession();

    const [disabled, setDisabled] = useState(true);
    const [pricePerNight, setPricePerNight] = useState({ id: "...", price: 0 });

    const { data: prices } = api.stripe.getAllPrices.useQuery();

    const { mutate } = api.booking.create.useMutation({
        onSuccess: (data) => {
            void router.push(`/confirm-and-pay/${data.id}`);
        },
    });

    const getNumberOfNights = (): number | null => {
        if (selected.from && selected.to) {
            const timeDiff = Math.abs(
                selected.to.getTime() - selected.from.getTime()
            );
            const numberOfNights = Math.ceil(timeDiff / (1000 * 3600 * 24));
            return numberOfNights;
        }
        return null;
    };

    const getTotalCost = (): number | null => {
        const numberOfNights = getNumberOfNights();
        if (numberOfNights) {
            return numberOfNights * pricePerNight.price;
        }
        return null;
    };

    const createBooking = (): void => {
        const { from, to } = selected;

        if (session && session.user && from && to) {
            mutate({
                userId: session.user.id,
                name: session.user.name ?? "",
                email: session.user.email ?? "",
                startDate: from,
                endDate: to,
                priceId: pricePerNight.id,
                numberOfNights: differenceInCalendarDays(to, from),
            });
        }
    };

    useEffect(() => {
        const { from, to } = selected;

        if (!(from && to)) return setDisabled(true);
        else {
            if (differenceInCalendarDays(to, from) < 5) setDisabled(true);
            else {
                setDisabled(false);
                if (prices) {
                    setPricePerNight({
                        ...findPricingWindow(from, to, prices),
                    });
                }
            }
        }
    }, [selected, prices]);

    return (
        <div className="flex w-1/6 scale-125 transform flex-col justify-between rounded-lg bg-white p-4 text-slate-800 shadow-3xl">
            <h2 className="text-center text-lg font-semibold">
                Booking Preview
            </h2>

            <p>Arrive on: {selected.from?.toLocaleDateString()}</p>

            <p>Depart on: {selected.to?.toLocaleDateString()}</p>

            <p>Total: {`$${getTotalCost() ?? "..."}`}</p>

            <div className="mt-4 flex justify-center">
                <button
                    onClick={createBooking}
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
