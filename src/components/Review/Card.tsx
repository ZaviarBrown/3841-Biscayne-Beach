import { format } from "date-fns";
import type { RouterOutputs } from "~/utils/api";

type FullReviewType = RouterOutputs["review"]["getAll"][0];

export default function ReviewCard({
    text,
    rating,
    user: { name },
    booking: { startDate },
}: FullReviewType) {
    return (
        <div className="m-5 rounded-lg bg-white px-10 py-5 text-slate-800 shadow-3xl">
            <p>{name}</p>
            <p>{format(startDate, "MMM yy")}</p>
            <p>{text}</p>
            <div>{rating}</div>
        </div>
    );
}
