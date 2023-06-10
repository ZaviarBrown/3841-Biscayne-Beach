import React, { useState } from "react";
import { DayPicker } from "react-day-picker";
import type { DateRange } from "react-day-picker";
import "react-day-picker/dist/style.css";

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
        <div>
            <h1>Booking</h1>
            <DayPicker mode="range" selected={dates} onSelect={setDates} />
            <button onClick={handleBooking}>Book Appointment</button>
        </div>
    );
};

export default Booking;
