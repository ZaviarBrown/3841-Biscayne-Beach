import type { Booking } from "@prisma/client";

export default function BookingCard({ startDate, endDate }: Booking) {
    return (
        <div className="m-5 flex flex-col items-center rounded-lg bg-white px-10 py-5 text-slate-800 shadow-3xl">
            <p>Arrive: {startDate.toLocaleDateString()}</p>
            <p>Depart: {endDate.toLocaleDateString()}</p>
        </div>
    );
}
