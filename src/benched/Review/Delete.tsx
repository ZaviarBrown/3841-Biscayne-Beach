import { useRouter } from "next/router";
import { api } from "~/utils/api";

export default function DeleteReview({ id }: { id: string }) {
    const router = useRouter();

    const { mutate } = api.review.delete.useMutation({
        onSuccess: () => void router.push("/your-bookings"),
    });
    return (
        <button
            className="m-5 rounded-lg bg-red-500 p-2 text-slate-50 shadow-xl"
            onClick={() => mutate(id)}
        >
            Delete Review
        </button>
    );
}
