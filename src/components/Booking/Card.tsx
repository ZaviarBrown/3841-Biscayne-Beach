import type { Booking } from "@prisma/client";
import DeleteBooking from "./Delete";

export default function BookingCard({ startDate, endDate, id }: Booking) {
    return (
        <div className="m-5 flex items-center rounded-lg bg-white p-5 text-2xl text-slate-800 shadow-3xl">
            <div className="flex flex-col text-left">
                <p>Check-in: {startDate.toLocaleDateString()}</p>
                <p>Check-out: {endDate.toLocaleDateString()}</p>
            </div>
            <DeleteBooking id={id} />
        </div>
    );
}
