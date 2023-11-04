import { api } from "~/utils/api";

export default function Dev() {
    const id = "clkelqi7z0003uw23xxw6wdz2";
    const { data } = api.bookings.getByInvoiceId.useQuery(id.slice(0, 10));
    console.log(data);
    return <div></div>;
}
