import { useSession } from "next-auth/react";
import CreateBooking from "~/components/Booking/Create";
import NavBarSpacer from "~/components/NavBarSpacer";

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
            <div className="mt-3 flex w-[650px] flex-col items-center gap-3 self-center rounded-lg bg-slate-700 px-5 py-1 text-center text-white shadow-3xl">
                <h2 className="text-5xl">Select your dates</h2>
                <p>
                    Please NOTE: When you rent directly from us, this property
                    does NOT tack on SERVICE FEES; CLEANING FEES; BOOKING FEES,
                    CONVENIENCE FEES or the like. Cleaning, booking, and service
                    is included in the total cost.
                </p>
            </div>
            <CreateBooking />
        </>
    );
}
