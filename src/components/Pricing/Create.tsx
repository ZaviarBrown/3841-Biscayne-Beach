import { api } from "~/utils/api";
import { useState } from "react";
import { DayPicker, type DateRange } from "react-day-picker";
import type { CalendarOptions } from "../Booking/Calendar";
import type { PricingWindowType } from "~/server/api/routers/pricing";
import { isAfter, isBefore } from "date-fns";

// TODO: Refactor PricingWindow to use "from" and "to"

const createCalendarOptions = (
    customPrices: PricingWindowType[]
): CalendarOptions => {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const yesterday = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - 1
    );

    const booked = customPrices.map(({ startDate, endDate }) => ({
        from: startDate,
        to: endDate,
    }));

    const disabled = [...booked, { from: startOfMonth, to: yesterday }];

    const options = {
        disabled,
        fromYear: today.getFullYear(),
        fromMonth: today,
        modifiers: { booked },
        modifiersStyles: {
            booked: {
                color: "red",
                fontWeight: "bolder",
                textDecoration: "line-through",
            },
        },
        fixedWeeks: true,
        showOutsideDays: true,
    };

    return options;
};

export default function CreatePricingWindow({
    customPrices,
}: {
    customPrices: PricingWindowType[];
}) {
    const [dates, setDates] = useState<DateRange>({ from: undefined });
    const [price, setPrice] = useState("");
    const [note, setNote] = useState("");

    const ctx = api.useContext();

    const { mutate: createWindow } = api.pricing.createWindow.useMutation({
        onSuccess: () => void ctx.pricing.invalidate(),
    });

    const handleSubmit = () => {
        const { from: startDate, to: endDate } = dates;

        if (startDate && endDate) {
            createWindow({
                startDate,
                endDate,
                priceInDollars: price,
                note,
            });
        }
    };

    return (
        <div className="mt-32 flex w-full justify-around bg-white px-10 py-5 text-slate-800 shadow-3xl">
            <DayPicker
                mode="range"
                selected={dates}
                onSelect={(range, justSelected) => {
                    if (!range) return setDates({ from: undefined });

                    if (customPrices && range?.from && range.to) {
                        for (const { startDate } of customPrices) {
                            if (isBefore(range.from, startDate)) {
                                if (isAfter(range.to, startDate)) {
                                    return setDates({ from: justSelected });
                                } else return setDates(range);
                            }
                        }
                    }
                    setDates(range);
                }}
                className="rounded-lg bg-white p-1 shadow-3xl"
                {...createCalendarOptions(customPrices)}
            />

            <input
                placeholder="0.00"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />
            <input
                placeholder="Reason for price"
                value={note}
                onChange={(e) => setNote(e.target.value)}
            />

            <button onClick={handleSubmit}>Create New Pricing Window</button>
        </div>
    );
}
