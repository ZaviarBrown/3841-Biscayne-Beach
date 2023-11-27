import { api } from "~/utils/api";
import DeleteBooking from "./Delete";
import BookingCard from "./Card";
import HasReviewed from "./HasReviewed";
import Link from "next/link";

// TODO: Order

export default function DisplayBookings({ userId }: { userId: string }) {
    const { data: userBookings } = api.booking.getByUserId.useQuery(userId);

    return (
        <div className="mt-5 text-2xl">
            {userBookings &&
                userBookings.map((booking) => {
                    return (
                        <div key={booking.id}>
                            <Link href={`/confirm-and-pay/${booking.id}`}>
                                <BookingCard {...booking} />
                            </Link>
                            <DeleteBooking id={booking.id} />
                            <HasReviewed
                                bookingId={booking.id}
                                review={booking.Review}
                            />
                        </div>
                    );
                })}
        </div>
    );
}
