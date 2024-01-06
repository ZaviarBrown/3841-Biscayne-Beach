import { api } from "~/utils/api";
import DeleteBooking from "../Booking/Delete";
import AdminBookingCard from "../Booking/AdminCard";

export default function ManageBookings() {
    const { data } = api.booking.getAllDetailed.useQuery();

    return (
        <>
            <div className="m-5 flex flex-col items-center gap-10 rounded-lg bg-white px-10 py-5 text-slate-800 shadow-3xl">
                <h1 className="text-3xl">Manage Bookings</h1>

                {data &&
                    data.map((booking) => {
                        return (
                            <div
                                className="flex flex-col rounded-lg bg-white px-10 py-5 shadow-3xl"
                                key={booking.id}
                            >
                                <AdminBookingCard {...booking} />
                                <DeleteBooking id={booking.id} />
                            </div>
                        );
                    })}
            </div>
        </>
    );
}
