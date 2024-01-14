import { api } from "~/utils/api";
import BookingCard from "./Card";
import Link from "next/link";

export default function DisplayBookings({ userId }: { userId: string }) {
    const { data: userBookings } = api.booking.getByUserId.useQuery(userId);

    if (!userBookings || !userBookings.length)
        return (
            <h1 className="m-auto rounded-lg bg-slate-700 p-10 text-4xl text-white">
                {"You don't have any bookings yet! "}
                <Link
                    className="text-blue-400 underline underline-offset-2"
                    href="/book"
                >
                    {"Let's change that"}
                </Link>
            </h1>
        );

    return (
        <>
            <div className="mx-auto mt-5 flex flex-col items-center text-2xl">
                {userBookings.map((booking) => {
                    return (
                        <div
                            className="m-5 flex w-fit flex-col justify-between gap-5 rounded-lg bg-slate-700 p-8 text-2xl text-slate-800 text-white shadow-3xl"
                            key={booking.id}
                        >
                            <BookingCard {...booking} />

                            {/* <HasReviewed
                            bookingId={booking.id}
                            review={booking.Review}
                        /> */}
                        </div>
                    );
                })}
            </div>
        </>
    );
}
