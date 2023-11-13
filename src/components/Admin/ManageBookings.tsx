import { api } from "~/utils/api";
import BookingCard from "../Booking/Card";
import DeleteBooking from "../Booking/Delete";

export default function ManageBookings() {
    const { data } = api.booking.getAll.useQuery();

    return (
        <div className="m-5 flex w-96 flex-col items-center gap-10 rounded-lg bg-white px-10 py-5 text-slate-800 shadow-3xl">
            <h1 className="text-3xl">Manage Bookings</h1>

            {data &&
                data.map((booking) => {
                    return (
                        <div className="flex flex-col" key={booking.id}>
                            <BookingCard
                                startDate={booking.from}
                                id={booking.id}
                                endDate={booking.to}
                            />
                            <DeleteBooking id={booking.id} />
                        </div>
                    );
                })}
        </div>
    );
}
