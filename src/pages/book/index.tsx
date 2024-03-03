import { useSession } from "next-auth/react";
import CreateBooking from "~/components/Booking/Create";
import NavBarSpacer from "~/components/Home/NavBarSpacer";

export default function BookPage() {
    const { data: session } = useSession();

    if (!session)
        return (
            <h1 className="m-auto text-center text-5xl text-white">
                You must be signed in to view this page
            </h1>
        );

    return (
        <>
            <NavBarSpacer />
            <div className="m-5 flex flex-col items-center gap-2 self-center rounded-lg bg-slate-700 px-5 py-2 text-center text-base text-white shadow-3xl md:text-xl">
                <h2 className="text-2xl md:text-5xl">Select your dates</h2>
                <p className="text-xl md:text-2xl">PLEASE NOTE: </p>
                <p>
                    When you book directly through this website, this property
                    does NOT tack on
                </p>
                <p>
                    SERVICE, CLEANING, BOOKING, CONVENIENCE, or any other fees.
                </p>
                <p>
                    Cleaning, booking, and service is included in the total
                    cost.
                </p>
            </div>
            <CreateBooking />
        </>
    );
}
