import { useSession } from "next-auth/react";
import DisplayBookings from "~/components/Booking/Display";

export default function UserBookingsPage() {
    const { data: session } = useSession();

    if (!session)
        return (
            <h1 className="text-7xl">
                You must be signed in to view this page
            </h1>
        );
    return <DisplayBookings userId={session.user.id} />;
}
