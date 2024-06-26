import { api } from "~/utils/api";
import DeleteBooking from "../Booking/Delete";
import AdminBookingCard from "../Booking/AdminCard";
import { useState } from "react";
import CancelledBookingCard from "../Booking/CancelledCard";
import AdminCreateBooking from "./Create";

export type SubPagesType = "upcoming" | "past" | "cancelled" | "create";

export default function ManageBookings() {
    const { data: futureBookings } = api.booking.getAllFuture.useQuery();
    const { data: pastBookings } = api.booking.getAllPast.useQuery();
    const { data: cancelledBookings } = api.booking.getAllCancelled.useQuery();
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
                            subPage === "cancelled"
                                ? "border-b-[6px] border-cyan-500 font-bold transition-all duration-200"
                                : "transition-all duration-200 hover:rounded-lg hover:bg-slate-300"
                        }`}
                        onClick={() => setSubPage("cancelled")}
                    >
                        Cancelled
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

                {subPage === "upcoming" && (
                    <>
                        <div className="grid grid-cols-7 border-y border-slate-400 bg-slate-300 p-2 text-center font-semibold ">
                            <p>Name</p>
                            <p>Email</p>
                            <p>Booked on</p>
                            <p>Check-In</p>
                            <p>Check-Out</p>
                            <p>Duration</p>
                            <p>Delete</p>
                        </div>
                        {futureBookings &&
                            futureBookings.map((booking, i) => {
                                return (
                                    <div
                                        className={`grid h-fit grid-cols-7  items-center p-2 text-center ${
                                            i % 2 ? "bg-slate-200" : "bg-white"
                                        }`}
                                        key={booking.id}
                                    >
                                        <AdminBookingCard {...booking} />
                                        <DeleteBooking {...booking} />
                                    </div>
                                );
                            })}
                    </>
                )}

                {subPage === "past" && (
                    <>
                        <div className="grid grid-cols-6 border-y border-slate-400 bg-slate-300 p-2 text-center font-semibold ">
                            <p>Name</p>
                            <p>Email</p>
                            <p>Booked on</p>
                            <p>Check-In</p>
                            <p>Check-Out</p>
                            <p>Duration</p>
                        </div>
                        {pastBookings &&
                            pastBookings.map((booking, i) => {
                                return (
                                    <div
                                        className={`grid h-fit grid-cols-6  items-center p-2 text-center ${
                                            i % 2 ? "bg-slate-200" : "bg-white"
                                        }`}
                                        key={booking.id}
                                    >
                                        <AdminBookingCard {...booking} />
                                    </div>
                                );
                            })}
                    </>
                )}
                {subPage === "cancelled" && (
                    <>
                        <div className="grid grid-cols-5 border-y border-slate-400 bg-slate-300 p-2 text-center font-semibold">
                            <p>ID</p>
                            <p>Name</p>
                            <p>Email</p>
                            <p>Cancelled on</p>
                            <p>Refund</p>
                        </div>
                        {cancelledBookings &&
                            cancelledBookings.map((booking, i) => {
                                return (
                                    <div
                                        className={`grid h-fit grid-cols-5  items-center p-2 text-center ${
                                            i % 2 ? "bg-slate-200" : "bg-white"
                                        }`}
                                        key={booking.id}
                                    >
                                        <CancelledBookingCard {...booking} />
                                    </div>
                                );
                            })}
                    </>
                )}
                {subPage === "create" && (
                    <>
                        <AdminCreateBooking setSubPage={setSubPage} />
                    </>
                )}
            </div>
        </div>
    );
}

const InfoCard = () => {
    return (
        <div className="flex w-full items-center justify-evenly rounded-lg bg-white p-3 text-center shadow-lg">
            <div>
                <p className="text-2xl">{"💯"}</p>
                <span className="text-2xl font-bold">?</span>
                <p className="text-sm text-slate-500">All-Time Total</p>
            </div>
            <span className="h-20 border-r" />
            <div>
                <p className="text-2xl">{"✅"}</p>
                <span className="text-2xl font-bold">?</span>
                <p className="text-sm text-slate-500">Completed This Year</p>
            </div>
            <span className="h-20 border-r" />
            <div>
                <p className="text-2xl">{"📅"}</p>
                <span className="text-2xl font-bold">?</span>
                <p className="text-sm text-slate-500">Scheduled This Year</p>
            </div>
            <span className="h-20 border-r" />
            <div>
                <p className="text-2xl">{"🔜"}</p>
                <span className="text-2xl font-bold">?</span>
                <p className="text-sm text-slate-500">In The Next 3 Months</p>
            </div>
            <span className="h-20 border-r" />
            <div>
                <p className="text-2xl">{"🚫"}</p>
                <span className="text-2xl font-bold">?</span>
                <p className="text-sm text-slate-500">Cancelled Total</p>
            </div>
        </div>
    );
};
