import { useRouter } from "next/router";
import DeleteReview from "~/components/Review/Delete";
import UpdateReview from "~/components/Review/Update";
import { api } from "~/utils/api";

export default function YourReview() {
    const router = useRouter();
    const { data } = api.review.getOne.useQuery(router.query.id as string);

    if (!data) return <h1>Loading...</h1>;

    return (
        <>
            <UpdateReview {...data} />
            <DeleteReview id={data.id} />
        </>
    );
}
