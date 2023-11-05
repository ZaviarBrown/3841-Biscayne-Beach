import { api } from "~/utils/api";
import type { Booking } from "@prisma/client";
import DeleteBooking from "./Delete";

// TODO: Order

const BookingCard = ({ id, startDate, endDate }: Booking) => {
    return (
        <div className="m-5 rounded-lg bg-white px-10 py-5 text-slate-800 shadow-3xl">
            <p>Arrive: {startDate.toLocaleDateString()}</p>
            <p>Depart: {endDate.toLocaleDateString()}</p>
            <DeleteBooking id={id} />
        </div>
    );
};

export default function DisplayBookings({ userId }: { userId: string }) {
    const { data: userBookings } = api.booking.getByUserId.useQuery(userId);

    return (
        <div className="mt-5 text-2xl">
            {userBookings &&
                userBookings.map((booking) => {
                    return <BookingCard key={booking.id} {...booking} />;
                })}
        </div>
    );
}
