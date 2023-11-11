import { api } from "~/utils/api";
import DeleteBooking from "./Delete";
import BookingCard from "./Card";

// TODO: Order

export default function DisplayBookings({ userId }: { userId: string }) {
    const { data: userBookings } = api.booking.getByUserId.useQuery(userId);

    return (
        <div className="mt-5 text-2xl">
            {userBookings &&
                userBookings.map((booking) => {
                    return (
                        <div key={booking.id}>
                            <BookingCard {...booking} />
                            <DeleteBooking id={booking.id} />
                        </div>
                    );
                })}
        </div>
    );
}
