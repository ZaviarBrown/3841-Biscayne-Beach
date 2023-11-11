import { useSession } from "next-auth/react";
import CreateBooking from "~/components/Booking/Create";

export default function BookPage() {
    const { data: session } = useSession();

    if (!session)
        return (
            <h1 className="text-7xl">
                You must be signed in to view this page
            </h1>
        );

    return (
        <>
            <h2 className="text-5xl">Select your dates</h2>
            <p className="text-3xl">5 night minimum</p>
            <CreateBooking />
        </>
    );
}
