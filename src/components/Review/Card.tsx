import type { Review } from "@prisma/client";

export default function ReviewCard({ text, rating }: Review) {
    return (
        <div className="m-5 rounded-lg bg-white px-10 py-5 text-slate-800 shadow-3xl">
            <p>{text}</p>
            <div>{rating}</div>
        </div>
    );
}
