import React, { useState } from "react";
import { DayPicker } from "react-day-picker";
import type { DateRange } from "react-day-picker";
import "react-day-picker/dist/style.css";
import PayPreview from "./PayPreview";

const Booking = () => {
    const [dates, setDates] = useState<DateRange>();

    const handleBooking = () => {
        const dateData = { dates };

        if (dates) {
            //TODO: TRPC api call
            const conflictingAppointments = {
                where: dateData,
            };

            if (!conflictingAppointments) {
                //TODO: TRPC api call
                const createAppointment = { booking: dateData };
                console.log("Success");
            } else {
                console.log("Error", dates);
            }
        } else {
            console.log("Error");
        }
    };

    return (
        <div className="m-3 flex justify-around">
            <DayPicker
                mode="range"
                selected={dates}
                onSelect={setDates}
                className="rounded-lg shadow-2xl"
            />
            <PayPreview selected={dates} />
        </div>
    );
};

export default Booking;
