import type { Booking } from "@prisma/client";
import DeleteBooking from "./Delete";
import { useEffect, useState } from "react";

export default function BookingCard({
    id,
    name,
    email,
    userId,
    startDate,
    endDate,
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
                    name={name}
                    email={email}
                    userId={userId}
                    price={price}
                    paymentId={paymentId}
                    startDate={startDate}
                    endDate={endDate}
                    status={status}
                />
            )}
        </div>
    );
}
