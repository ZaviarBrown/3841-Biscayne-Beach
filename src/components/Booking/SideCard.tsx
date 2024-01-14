import type { Booking } from "@prisma/client";
import DeleteBooking from "./Delete";
import { useEffect, useState } from "react";
import { convertCentsIntoDollars } from "~/utils/booking";
import OpenModalButton from "../Modal/OpenModalButton";
import RevertPendingBooking from "../Modal/RevertPendingBooking";
import { api } from "~/utils/api";
import { useRouter } from "next/router";

export default function BookingSideCard({
    id,
    name,
    email,
    userId,
    startDate,
    endDate,
    paymentId,
    price,
    status,
}: Booking) {
    const router = useRouter();
    const ctx = api.useContext();
    const [isFuture, setIsFuture] = useState(true);
    const { mutate } = api.booking.deletePending.useMutation({
        onSuccess: () => {
            if (router.query.id) void router.push("/book");
            void ctx.booking.invalidate();
        },
    });

    useEffect(() => {
        if (startDate.getTime() < Date.now()) {
            setIsFuture(false);
        }
    }, [startDate]);

    return (
        <>
            <div className="grid grid-cols-5 items-center gap-6 pb-5 text-center align-middle">
                <p className="col-span-2">
                    Check-in: {startDate.toLocaleDateString()}
                </p>
                <span className="m-auto h-10 w-0 border-r" />
                <p className="col-span-2">
                    Check-out: {endDate.toLocaleDateString()}
                </p>
                <p className="col-span-2">Payment: {status}</p>
                <span className="m-auto h-10 w-0 border-r" />
                <p className="col-span-2">
                    Price: {!price ? "$0.00" : convertCentsIntoDollars(price)}
                </p>
            </div>

            <OpenModalButton
                buttonText="Cancel Booking"
                onModalClose={() => null}
                className="w-fit rounded-lg bg-red-500 px-5 py-2 text-slate-50 shadow-xl duration-200 hover:scale-105 hover:bg-red-600 "
                onModalSubmit={() => mutate(id)}
                modalComponent={<RevertPendingBooking />}
            />
        </>
    );
}
