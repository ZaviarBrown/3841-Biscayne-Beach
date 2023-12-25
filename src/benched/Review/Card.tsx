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
        <div className="m-5 flex w-96 flex-col items-center rounded-lg bg-white px-10 py-5 text-slate-800 shadow-3xl">
            <div className="flex w-full justify-between">
                <p>{name}</p>
                <p>{format(startDate, "MMM yy")}</p>
            </div>
            <div className="flex gap-3">
                {Array(rating)
                    .fill("⭐️")
                    .map((_, i) => (
                        <div className="text-blue-500" key={i}>
                            ⭐️
                        </div>
                    ))}
            </div>
            <p>{text}</p>
        </div>
    );
}
