import { api } from "~/utils/api";

// TODO: Stripe cancellation fee


export default function DeleteBooking({ id }: { id: string }) {
    const ctx = api.useContext();
    const { mutate } = api.booking.delete.useMutation({
        onSuccess: () => ctx.booking.invalidate(),
    });

    return (
        <button
            className="m-5 rounded-lg bg-red-500 p-2 text-slate-50 shadow-xl"
            onClick={() => mutate(id)}
        >
            Delete Booking
        </button>
    );
}
