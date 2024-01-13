import { useState } from "react";
import type { DateRange } from "react-day-picker";
import AdminCalendar from "./Calendar";
import AdminDatePreview from "./DatePreview";
import type { SubPagesType } from "./ManageBookings";

export default function AdminCreateBooking({
    setSubPage,
}: {
    setSubPage: React.Dispatch<React.SetStateAction<SubPagesType>>;
}) {
    const [dates, setDates] = useState<DateRange>({ from: undefined });
    return (
        <div className="m-auto flex justify-center gap-3 self-center rounded-lg bg-white p-3 shadow-3xl">
            <AdminCalendar dates={dates} setDates={setDates} />
            <AdminDatePreview selected={dates} setSubPage={setSubPage} />
        </div>
    );
}
