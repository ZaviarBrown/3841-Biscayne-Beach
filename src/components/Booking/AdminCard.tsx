import type { Booking } from "@prisma/client";

export default function AdminBookingCard({
    name,
    email,
    startDate,
    endDate,
    createdAt,
    numberOfNights,
}: Booking) {
    return (
        <div className="flex flex-col items-start text-2xl text-slate-800">
            <p>Name: {name}</p>
            <p>Email: {email}</p>
            <p>Booked on: {createdAt.toLocaleDateString()}</p>
            <p>{numberOfNights} nights</p>
            <p>Check-in: {startDate.toLocaleDateString()}</p>
            <p>Check-out: {endDate.toLocaleDateString()}</p>
        </div>
    );
}
