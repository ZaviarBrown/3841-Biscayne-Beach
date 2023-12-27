import { useSession } from "next-auth/react";
import CreateBooking from "~/components/Booking/Create";
import NavBarSpacer from '~/components/NavBarSpacer';

export default function BookPage() {
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
            <div className="m-5 text-center text-white">
                <h2 className="text-5xl">Select your dates</h2>
                <p className="text-3xl">5 night minimum</p>
            </div>
            <CreateBooking />
        </>
    );
}
