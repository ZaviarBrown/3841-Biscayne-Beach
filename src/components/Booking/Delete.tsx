import { useRouter } from "next/router";
import { api } from "~/utils/api";
import OpenModalButton from "../Modal/OpenModalButton";
import AdminConfirmDeleteBookingModal from "../Modal/AdminConfirmDeleteBookingModal";
import { useEffect, useState } from "react";
import { add, isBefore } from "date-fns";
import { env } from "~/env.mjs";

export default function DeleteBooking({
    id,
    name,
    userId,
    price,
    paymentId,
    startDate,
    endDate,
}: {
    id: string;
    name: string;
    userId: string;
    price: number;
    paymentId: string | null;
    startDate: Date;
    endDate: Date;
}) {
    const [refundPrice, setRefundPrice] = useState(0);
    const ctx = api.useContext();
    const router = useRouter();
    const { mutate } = api.booking.delete.useMutation({
        onSuccess: () => {
            if (router.query.id) void router.push("/book");
            void ctx.booking.invalidate();
        },
    });

    useEffect(() => {
        const maxRefund = Math.floor(
            price * Number(env.NEXT_PUBLIC_STRIPE_FEE)
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

    return (
        <OpenModalButton
            modalComponent={
                <AdminConfirmDeleteBookingModal
                    name={name}
                    refundPrice={refundPrice}
                    startDate={startDate}
                    endDate={endDate}
                    paymentId={paymentId}
                />
            }
            buttonText="Cancel Booking"
            className="m-auto w-fit rounded-lg bg-red-500 px-5 py-2 text-slate-50 shadow-xl duration-200 hover:scale-105 hover:bg-red-600 "
            onModalSubmit={() => mutate({ id, refundPrice, userId, paymentId })}
            onModalClose={() => null}
        />
    );
}
