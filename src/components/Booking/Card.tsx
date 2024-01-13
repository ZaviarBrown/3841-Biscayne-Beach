import type { Booking } from "@prisma/client";
import DeleteBooking from "./Delete";
import { useEffect, useState } from "react";

export default function BookingCard({
    startDate,
    endDate,
    id,
    userId,
    name,
    paymentId,
    price,
    status,
}: Booking) {
    const [isFuture, setIsFuture] = useState(true);

    useEffect(() => {
        if (startDate.getTime() < Date.now()) {
            setIsFuture(false);
        }
    }, [startDate]);

    return (
        <div className="m-5 flex items-center rounded-lg bg-white p-5 text-2xl text-slate-800 shadow-3xl">
            <div className="flex flex-col text-left">
                <p>Check-in: {startDate.toLocaleDateString()}</p>
                <p>Check-out: {endDate.toLocaleDateString()}</p>
                <p>Payment status: {status}</p>
            </div>
            {isFuture && (
                <DeleteBooking
                    id={id}
                    userId={userId}
                    name={name}
                    price={price}
                    paymentId={paymentId}
                    startDate={startDate}
                    endDate={endDate}
                />
            )}{" "}
        </div>
    );
}
