import { useRouter } from "next/router";
import DeleteReview from "~/benched/Review/Delete";
import UpdateReview from "~/benched/Review/Update";
import { api } from "~/utils/api";

export default function YourReview() {
    const router = useRouter();
    const { data } = api.review.getOne.useQuery(router.query.id as string, {
        enabled: !!router.query.id,
    });

    if (!data) return <h1>Loading...</h1>;

    return (
        <>
            <UpdateReview {...data} />
            <DeleteReview id={data.id} />
        </>
    );
}
