import React, { useState } from "react";
import { DayPicker } from "react-day-picker";
import type { DateRange } from "react-day-picker";
import "react-day-picker/dist/style.css";
import PayPreview from "./PayPreview";
import { api } from "~/utils/api";
import { isBefore, isAfter } from "date-fns";

type StartEndDates = {
    from: Date;
    to: Date;
};

export interface CalendarOptions {
    disabled: StartEndDates[];
    fromYear: number;
    fromMonth: Date;
    modifiers: {
        booked: StartEndDates[];
    };
    modifiersStyles: {
        booked: {
            color: string;
            fontWeight: string;
            textDecoration: string;
        };
    };
    fixedWeeks: boolean;
    showOutsideDays: boolean;
}

const createCalendarOptions = (booked: StartEndDates[]): CalendarOptions => {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const yesterday = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - 1
    );

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

const Booking = () => {
    const [dates, setDates] = useState<DateRange>();

    let { data: booked } = api.bookings.getAllBookedDates.useQuery();
    if (!booked) booked = [];

    return (
        <div className="sticky top-32 z-50 flex flex-col items-center">
            <DayPicker
                mode="range"
                selected={dates}
                onSelect={(range, justSelected) => {
                    if (booked && range?.from && range.to) {
                        for (const { from } of booked) {
                            if (isBefore(range.from, from)) {
                                if (isAfter(range.to, from)) {
                                    return setDates({ from: justSelected });
                                } else return setDates(range);
                            }
                        }
                    }
                    setDates(range);
                }}
                className="rounded-lg bg-white p-1 shadow-3xl"
                {...createCalendarOptions(booked)}
            />
            <PayPreview selected={dates} />
        </div>
    );
};

export default Booking;
