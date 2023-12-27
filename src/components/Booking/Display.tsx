import { api } from "~/utils/api";
import DeleteBooking from "./Delete";
import BookingCard from "./Card";
import HasReviewed from "./HasReviewed";
import Link from "next/link";

// TODO: Order

export default function DisplayBookings({ userId }: { userId: string }) {
    const { data: userBookings } = api.booking.getByUserId.useQuery(userId);

    if (!userBookings || !userBookings.length)
        return (
            <h1 className="m-auto text-4xl text-white">
                {"You don't have any bookings yet! "}
                <Link
                    className="text-blue-200 underline underline-offset-2"
                    href="/book"
                >
                    {"Let's change that"}
                </Link>
            </h1>
        );

    return (
        <div className="mt-5 flex text-2xl">
            {userBookings.map((booking) => {
                return (
                    <div key={booking.id}>
                        {/* 
                            // TODO: Different links depending on booking status
                            */}
                        {/* <Link href={`/confirm-and-pay/${booking.id}`}> */}
                        <BookingCard {...booking} />
                        {/* </Link> */}
                        
                        {/* <HasReviewed
                            bookingId={booking.id}
                            review={booking.Review}
                        /> */}
                    </div>
                );
            })}
        </div>
    );
}
