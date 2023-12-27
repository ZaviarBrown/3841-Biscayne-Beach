import { useState } from "react";
import type { DateRange } from "react-day-picker";
import Calendar from "./Calendar";
import PayPreview from "./PayPreview";

export default function CreateBooking() {
    const [dates, setDates] = useState<DateRange>({ from: undefined });
    return (
        <div className="m-5 flex justify-center gap-3 self-center rounded-lg bg-white p-10 shadow-3xl">
            <Calendar dates={dates} setDates={setDates} />
            <PayPreview selected={dates} />
        </div>
    );
}
