import { useState } from "react";
import type { DateRange } from "react-day-picker";
import MobileCalendar from "./Mobile/Calendar";
import DesktopCalendar from "./Desktop/Calendar";
import MobilePayPreview from "./Mobile/PayPreview";
import DesktopPayPreview from "./Desktop/PayPreview";
import { useMobileContext } from "~/context/MobileContext";

export default function CreateBooking() {
    const [dates, setDates] = useState<DateRange>({ from: undefined });
    const { isMobile } = useMobileContext();

    if (isMobile)
        return (
            <div className="my-5 flex flex-col justify-center self-center rounded-lg bg-white shadow-3xl">
                <MobileCalendar dates={dates} setDates={setDates} />
                <MobilePayPreview selected={dates} />
            </div>
        );
    else
        return (
            <div className="m-5 flex justify-center gap-3 self-center rounded-lg bg-white p-10 shadow-3xl">
                <DesktopCalendar dates={dates} setDates={setDates} />
                <DesktopPayPreview selected={dates} />
            </div>
        );
}
