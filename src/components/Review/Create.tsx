import { useRouter } from "next/router";
import { useState } from "react";
import { api } from "~/utils/api";

export default function CreateReview() {
    const router = useRouter();

    const [text, setText] = useState("");
    const [rating, setRating] = useState(0);

    const { mutate } = api.review.create.useMutation({
        onSuccess: () => {
            void router.push("/reviews");
        },
    });

    return (
        <form>
            <textarea value={text} onChange={(e) => setText(e.target.value)} />
            <input
                type="number"
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
            />
            <button
                onClick={() => {
                    mutate({
                        text,
                        rating,
                        bookingId: router.query.id as string,
                    });
                }}
            >
                Submit Review
            </button>
        </form>
    );
}
