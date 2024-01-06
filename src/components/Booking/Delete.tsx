import { useRouter } from "next/router";
import { api } from "~/utils/api";
import OpenModalButton from "../Modal/OpenModalButton";
import AdminConfirmDeleteBookingModal from "../Modal/AdminConfirmDeleteBookingModal";

// TODO: Stripe cancellation fee

export default function DeleteBooking({ id }: { id: string }) {
    const ctx = api.useContext();
    const router = useRouter();
    const { mutate } = api.booking.delete.useMutation({
        onSuccess: () => {
            if (router.query.id) void router.push("/book");
            void ctx.booking.invalidate();
        },
    });

    return (
        <OpenModalButton
            modalComponent={<AdminConfirmDeleteBookingModal />}
            buttonText="Cancel Booking"
            className="m-auto w-fit rounded-lg bg-red-500 px-5 py-2 text-slate-50 shadow-xl duration-200 hover:scale-105 hover:bg-red-600 "
            onModalSubmit={() => mutate(id)}
            onModalClose={() => {
                return "Hey";
            }}
        />
    );
}
