import React, { useState } from "react";
import { DayPicker } from "react-day-picker";
import type { DateRange } from "react-day-picker";
import "react-day-picker/dist/style.css";
import PayPreview from "./PayPreview";

const Booking = () => {
    const [dates, setDates] = useState<DateRange>();

    return (
        <div className="sticky top-32 z-50 flex flex-col items-center">
            <DayPicker
                mode="range"
                selected={dates}
                onSelect={setDates}
                className="rounded-lg  bg-white shadow-3xl"
            />
            <PayPreview selected={dates} />
        </div>
    );
};

export default Booking;
