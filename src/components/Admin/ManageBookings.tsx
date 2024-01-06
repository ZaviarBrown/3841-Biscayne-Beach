import { api } from "~/utils/api";
import DeleteBooking from "../Booking/Delete";
import AdminBookingCard from "../Booking/AdminCard";
import { useState } from "react";

type SubPagesType = "upcoming" | "past" | "canceled" | "create";

export default function ManageBookings() {
    const { data } = api.booking.getAllDetailed.useQuery();
    const [subPage, setSubPage] = useState<SubPagesType>("upcoming");

    return (
        <div className="flex h-full flex-col gap-5">
            <InfoCard />
            <div className="flex h-full flex-col rounded-lg bg-slate-100 text-black shadow-3xl">
                <div className="flex h-16 w-full items-center justify-evenly rounded-t-lg bg-white text-center text-xl">
                    <p
                        className={`w-full p-4 hover:cursor-pointer ${
                            subPage === "upcoming"
                                ? "border-b-[6px] border-cyan-500 font-bold transition-all duration-200"
                                : "transition-all duration-200 hover:rounded-lg hover:bg-slate-300"
                        }`}
                        onClick={() => setSubPage("upcoming")}
                    >
                        Upcoming
                    </p>

                    <span className="h-12 border-r" />

                    <p
                        className={`w-full p-4 hover:cursor-pointer ${
                            subPage === "past"
                                ? "border-b-[6px] border-cyan-500 font-bold transition-all duration-200"
                                : "transition-all duration-200 hover:rounded-lg hover:bg-slate-300"
                        }`}
                        onClick={() => setSubPage("past")}
                    >
                        Past
                    </p>

                    <span className="h-12 border-r" />

                    <p
                        className={`w-full p-4 hover:cursor-pointer ${
                            subPage === "canceled"
                                ? "border-b-[6px] border-cyan-500 font-bold transition-all duration-200"
                                : "transition-all duration-200 hover:rounded-lg hover:bg-slate-300"
                        }`}
                        onClick={() => setSubPage("canceled")}
                    >
                        Canceled
                    </p>

                    <span className="h-12 border-r" />

                    <p
                        className={`w-full p-4 hover:cursor-pointer ${
                            subPage === "create"
                                ? "border-b-[6px] border-cyan-500 font-bold transition-all duration-200"
                                : "transition-all duration-200 hover:rounded-lg hover:bg-slate-300"
                        }`}
                        onClick={() => setSubPage("create")}
                    >
                        Create
                    </p>
                </div>
                <div className="grid grid-cols-7 border-y border-slate-400 bg-slate-300 p-2 text-center font-semibold ">
                    <p>Name</p>
                    <p>Email</p>
                    <p>Booked on</p>
                    <p>Check-In</p>
                    <p>Check-Out</p>
                    <p>Duration</p>
                    <p>Delete</p>
                </div>
                {data &&
                    data.map((booking, i) => {
                        return (
                            <div
                                className={`grid h-fit grid-cols-7  items-center p-2 text-center ${
                                    i % 2 ? "bg-slate-200" : "bg-white"
                                }`}
                                key={booking.id}
                            >
                                <AdminBookingCard {...booking} />
                                <DeleteBooking id={booking.id} />
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}

const InfoCard = () => {
    return (
        <div className="flex w-full items-center justify-evenly rounded-lg bg-white p-3 text-center shadow-lg">
            <div>
                <p className="text-2xl">{"💯"}</p>
                <span className="text-2xl font-bold">0</span>
                <p className="text-sm text-slate-500">All-Time Total</p>
            </div>
            <span className="h-20 border-r" />
            <div>
                <p className="text-2xl">{"✅"}</p>
                <span className="text-2xl font-bold">0</span>
                <p className="text-sm text-slate-500">Completed This Year</p>
            </div>
            <span className="h-20 border-r" />
            <div>
                <p className="text-2xl">{"📅"}</p>
                <span className="text-2xl font-bold">0</span>
                <p className="text-sm text-slate-500">Scheduled This Year</p>
            </div>
            <span className="h-20 border-r" />
            <div>
                <p className="text-2xl">{"🔜"}</p>
                <span className="text-2xl font-bold">0</span>
                <p className="text-sm text-slate-500">In The Next 3 Months</p>
            </div>
            <span className="h-20 border-r" />
            <div>
                <p className="text-2xl">{"🚫"}</p>
                <span className="text-2xl font-bold">0</span>
                <p className="text-sm text-slate-500">Canceled Total</p>
            </div>
        </div>
    );
};
