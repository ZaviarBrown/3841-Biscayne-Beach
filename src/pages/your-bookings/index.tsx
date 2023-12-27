import { useSession } from "next-auth/react";
import DisplayBookings from "~/components/Booking/Display";
import NavBarSpacer from "~/components/NavBarSpacer";

export default function UserBookingsPage() {
    const { data: session } = useSession();

    if (!session)
        return (
            <h1 className="m-auto text-5xl text-white">
                You must be signed in to view this page
            </h1>
        );
    return (
        <>
            <NavBarSpacer />
            <DisplayBookings userId={session.user.id} />
        </>
    );
}
