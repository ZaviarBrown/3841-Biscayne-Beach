import { useRouter } from "next/router";
import { api } from "~/utils/api";

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
        <button
            className="m-3 w-32 self-center rounded-lg bg-red-500 p-2 text-slate-50 shadow-xl"
            onClick={() => mutate(id)}
        >
            Cancel Booking
        </button>
    );
}
