import type { Review } from "@prisma/client";

import { useRouter } from "next/router";
import { useState } from "react";
import { api } from "~/utils/api";

export default function UpdateReview({
    id,
    text: oldText,
    rating: oldRating,
}: Review) {
    const router = useRouter();

    const [text, setText] = useState(oldText);
    const [rating, setRating] = useState(oldRating);

    const { mutate } = api.review.update.useMutation({
        onSuccess: () => {
            void router.push("/reviews");
        },
    });

    return (
        <form className="m-5 flex w-96 flex-col items-center gap-10 rounded-lg bg-white px-10 py-5 text-slate-800 shadow-3xl">
            <textarea
                className="h-28 w-full rounded-lg p-4 outline outline-1 outline-black"
                placeholder="How was your stay?"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <input
                className="w-1/4 rounded-lg p-1 text-center outline outline-1 outline-black"
                type="number"
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
            />
            <button
                className="rounded-lg bg-white px-5 py-2 text-slate-800 shadow-3xl"
                onClick={(e) => {
                    e.preventDefault();
                    mutate({
                        id,
                        text,
                        rating,
                    });
                }}
            >
                Submit Review
            </button>
        </form>
    );
}
