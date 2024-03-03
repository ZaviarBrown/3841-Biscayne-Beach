import { useRouter } from "next/router";
import { api } from "~/utils/api";
import OpenModalButton from "../Modal/OpenModalButton";
import AdminConfirmDeleteBookingModal from "../Modal/AdminConfirmDeleteBookingModal";
import { useEffect, useState } from "react";
import { add, isBefore } from "date-fns";
import { env } from "~/env.mjs";
import { useSession } from "next-auth/react";
import UserConfirmDeleteBookingModal from "../Modal/UserConfirmDeleteBookingModal";
import DeleteFreeBookingModal from "../Modal/DeleteFreeBookingModal";
import { render } from "@react-email/render";
import CancelConfirmationEmail from "~/emails/CancelConfirmation";
import RevertPendingBooking from "../Modal/RevertPendingBooking";

export default function DeleteBooking({
    id,
    name,
    email,
    userId,
    price,
    paymentId,
    startDate,
    endDate,
    status,
}: {
    id: string;
    name: string;
    email: string;
    userId: string;
    price: number;
    paymentId: string | null;
    startDate: Date;
    endDate: Date;
    status: string;
}) {
    const [refundPrice, setRefundPrice] = useState(0);
    const { data: session } = useSession();
    const ctx = api.useContext();
    const router = useRouter();
    const { mutate } = api.booking.delete.useMutation({
        onSuccess: () => {
            if (router.query.id) void router.push("/book");
            void ctx.booking.invalidate();
        },
    });

    const { mutate: deletePending } = api.booking.deletePending.useMutation({
        onSuccess: () => {
            void ctx.booking.invalidate();
        },
    });

    useEffect(() => {
        const maxRefund = Math.floor(
            price * Number(env.NEXT_PUBLIC_REFUND_FEE)
        );
        const today = new Date();

        const fullRefundCutoff = add(today, { days: 14 });
        if (isBefore(fullRefundCutoff, startDate))
            return setRefundPrice(maxRefund);

        const halfRefundCutoff = add(today, { days: 3 });
        if (isBefore(halfRefundCutoff, startDate))
            return setRefundPrice(Math.floor(maxRefund / 2));
        else return setRefundPrice(0);
    }, [startDate, price]);

    const handleSubmit = () => {
        const bookingInfo = { id, userId, refundPrice, paymentId };
        const emailInfo = {
            to: email,
            subject: "Cancellation Confirmation",
            html: render(
                <CancelConfirmationEmail
                    name={name}
                    email={email}
                    startDate={startDate}
                    endDate={endDate}
                />
            ),
        };

        mutate({ bookingInfo, emailInfo });
    };

    // TODO: Refactor - move conditional logic up a folder layer

    if (session && session.user.id === userId) {
        if (status === "admin")
            return (
                <OpenModalButton
                    modalComponent={
                        <DeleteFreeBookingModal
                            name={"my"}
                            startDate={startDate}
                            endDate={endDate}
                        />
                    }
                    buttonText="Cancel Booking"
                    className="m-auto w-fit rounded-lg bg-red-500 px-5 py-2 text-lg text-slate-50 shadow-xl duration-200 hover:scale-105 hover:bg-red-600 md:text-2xl "
                    onModalSubmit={handleSubmit}
                />
            );

        if (status === "pending")
            return (
                <OpenModalButton
                    buttonText="Cancel Booking"
                    className="m-auto w-fit rounded-lg bg-red-500 px-5 py-2 text-lg text-slate-50 shadow-xl duration-200 hover:scale-105 hover:bg-red-600 md:text-2xl "
                    onModalSubmit={() => deletePending(id)}
                    modalComponent={<RevertPendingBooking />}
                />
            );

        return (
            <OpenModalButton
                modalComponent={
                    <UserConfirmDeleteBookingModal
                        refundPrice={refundPrice}
                        startDate={startDate}
                        endDate={endDate}
                    />
                }
                buttonText="Cancel Booking"
                className="m-auto w-fit rounded-lg bg-red-500 px-5 py-2 text-lg text-slate-50 shadow-xl duration-200 hover:scale-105 hover:bg-red-600 md:text-2xl "
                onModalSubmit={handleSubmit}
            />
        );
    }

    return (
        <OpenModalButton
            modalComponent={
                <AdminConfirmDeleteBookingModal
                    name={name}
                    refundPrice={refundPrice}
                    startDate={startDate}
                    endDate={endDate}
                />
            }
            buttonText="Cancel Booking"
            className="m-auto w-fit rounded-lg bg-red-500 px-5 py-2 text-lg text-slate-50 shadow-xl duration-200 hover:scale-105 hover:bg-red-600 md:text-2xl "
            onModalSubmit={handleSubmit}
        />
    );
}
