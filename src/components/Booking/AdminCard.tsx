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
        <>
            <p>{name}</p>
            <p className="flex flex-wrap justify-center">
                <span> {`${email.split("@")[0] || "not found"}`}</span>
                <span>{`@${email.split("@")[1] || "gmail.com"}`}</span>
            </p>
            <p>{createdAt.toLocaleDateString()}</p>
            <p>{startDate.toLocaleDateString()}</p>
            <p>{endDate.toLocaleDateString()}</p>
            <p>{numberOfNights} nights</p>
        </>
    );
}
