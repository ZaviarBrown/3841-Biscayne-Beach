import type { Review } from "@prisma/client";
import { useRouter } from "next/router";

export default function HasReviewed({
    bookingId,
    review,
}: {
    bookingId: string;
    review: Review | null;
}) {
    const router = useRouter();

    if (!review)
        return (
            <button
                onClick={() =>
                    void router.push(`/review-your-stay/${bookingId}`)
                }
                className="m-5 rounded-lg bg-blue-500 p-2 text-slate-50 shadow-xl"
            >
                Write a review
            </button>
        );

    // TODO: Make into a modal
    return (
        <button
            onClick={() => void router.push(`/your-review/${review.id}`)}
            className="m-5 rounded-lg bg-green-500 p-2 text-slate-50 shadow-xl"
        >
            Edit your review
        </button>
    );
}
