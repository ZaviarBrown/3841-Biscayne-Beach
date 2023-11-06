import { DayPicker } from "react-day-picker";
import { api } from "~/utils/api";
import { isBefore, isAfter } from "date-fns";
import type { DateRange } from "react-day-picker";

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

// TODO: SSR
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

const Calendar = ({
    dates,
    setDates,
}: {
    dates: DateRange;
    setDates: React.Dispatch<React.SetStateAction<DateRange>>;
}) => {
    // TODO: SSR
    let { data: booked } = api.booking.getAll.useQuery();
    if (!booked) booked = [];

    return (
        <DayPicker
            mode="range"
            selected={dates}
            onSelect={(range, justSelected) => {
                if (!range) return setDates({ from: undefined });

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
            className="scale-150 transform rounded-lg bg-white p-1 shadow-3xl"
            {...createCalendarOptions(booked)}
        />
    );
};

export default Calendar;
