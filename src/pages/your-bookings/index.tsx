import { useSession } from "next-auth/react";
import DisplayBookings from "~/components/Booking/Display";

export default function UserBookingsPage() {
    const { data: session } = useSession();
    return <>{session && <DisplayBookings userId={session.user.id} />}</>;
}
