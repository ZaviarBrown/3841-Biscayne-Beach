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
    const [error, setError] = useState("");

    const ctx = api.useContext();

    const { mutate: createWindow } = api.pricing.createWindow.useMutation({
        onSuccess: () => {
            setDates({ from: undefined });
            setPrice("");
            setNote("");
            setError("");
            void ctx.pricing.invalidate();
        },
    });

    const handleSubmit = () => {
        const { from: startDate, to: endDate } = dates;

        if (isNaN(Number(price))) {
            return setError("Invalid price");
        }

        if (startDate && endDate) {
            let [dollarCheck, centCheck] = price.split(".");

            if (!dollarCheck) return setError("Invalid price");

            if (!centCheck) centCheck = "00";
            if (centCheck.length === 1) centCheck += "0";
            if (centCheck.length > 2) centCheck = centCheck.slice(0, 2);

            dollarCheck += "." + centCheck;

            setError("");

            createWindow({
                startDate,
                endDate,
                priceInDollars: dollarCheck,
                note,
            });
        }
    };

    return (
        <div className="flex justify-evenly">
            <div className="m-5 flex rounded-lg p-8 text-slate-800">
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
                    className="scale-125 rounded-lg bg-white p-1 shadow-3xl"
                    {...createCalendarOptions(customPrices)}
                />
            </div>

            <div className="my-8 flex flex-col justify-around rounded-lg bg-white p-5 text-xl shadow-2xl">
                <p>
                    Start date:{" "}
                    {dates.from ? dates.from.toLocaleDateString() : "..."}
                </p>
                <p>
                    End date: {dates.to ? dates.to.toLocaleDateString() : "..."}
                </p>
                <label>
                    {error ? <p className="text-red-500">{error}</p> : null}
                    Price in USD: $
                    <input
                        placeholder="0.00"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="m-1 w-20 rounded px-1 outline outline-1 outline-slate-200 focus:outline-slate-400"
                    />
                </label>
                <label>
                    Note:
                    <br />
                    <input
                        placeholder="Ex: Music Festival"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        className="w-full rounded px-1 outline outline-1 outline-slate-200 focus:outline-slate-400"
                    />
                </label>

                <button
                    className="rounded-lg bg-green-500 px-2 py-2 text-xl text-white shadow-3xl duration-200 hover:-translate-y-1 disabled:transform-none disabled:bg-slate-500"
                    onClick={handleSubmit}
                    disabled={!price || !note || !dates.from || !dates.to}
                >
                    Create New Pricing Window
                </button>
            </div>
        </div>
    );
}
