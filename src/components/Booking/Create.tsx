import { useState } from "react";
import type { DateRange } from "react-day-picker";
import Calendar from "./Calendar";
import PayPreview from "./PayPreview";

export default function CreateBooking() {
    const [dates, setDates] = useState<DateRange>({ from: undefined });
    return (
        <div className="mt-32 flex w-full justify-around">
            <Calendar dates={dates} setDates={setDates} />
            <PayPreview selected={dates} />
        </div>
    );
}
