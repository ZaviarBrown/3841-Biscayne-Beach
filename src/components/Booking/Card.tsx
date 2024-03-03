import type { Booking } from "@prisma/client";
import DeleteBooking from "./Delete";
import { useEffect, useState } from "react";
import { convertCentsIntoDollars } from "~/utils/booking";
import Link from "next/link";

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
        <>
            <div className="grid grid-cols-5 items-center gap-6 pb-5 text-center align-middle text-lg md:text-2xl">
                <p className="col-span-2">
                    Check-in: {startDate.toLocaleDateString()}
                </p>
                <span className="m-auto h-10 w-0 border-r" />
                <p className="col-span-2">
                    Check-out: {endDate.toLocaleDateString()}
                </p>
                <p className="col-span-2">Payment: {status}</p>
                <span className="m-auto h-10 w-0 border-r" />
                <p className="col-span-2">
                    Price: {!price ? "$0.00" : convertCentsIntoDollars(price)}
                </p>
            </div>

            <div className="flex justify-around gap-3">
                {status === "pending" && (
                    <Link
                        className="m-auto w-fit rounded-lg bg-blue-500 px-5 py-2 text-center text-lg text-slate-50 shadow-xl duration-200 hover:scale-105 hover:bg-blue-600 md:text-2xl "
                        href={`/confirm-and-pay/${id}`}
                    >
                        Finish Payment
                    </Link>
                )}

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
        </>
    );
}
