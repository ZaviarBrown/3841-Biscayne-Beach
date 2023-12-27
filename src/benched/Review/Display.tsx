import { api } from "~/utils/api";
import ReviewCard from "./Card";

export default function DisplayReview() {
    const { data: allReviews } = api.review.getAll.useQuery();

    return (
        <div className="mt-5 text-2xl">
            {allReviews &&
                allReviews.map((review) => (
                    <ReviewCard {...review} key={review.id} />
                ))}
        </div>
    );
}
