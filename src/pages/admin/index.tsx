import { useSession } from "next-auth/react";
import { useState } from "react";
import ManagePricing from "~/components/Admin/ManagePricing";
import ManageBookings from "~/components/Admin/ManageBookings";
import ManageUsers from "~/components/Admin/ManageUsers";
import SideBar from "~/components/Admin/SideBar";
import NavBarSpacer from "~/components/Home/NavBarSpacer";

export type PagesType = "bookings" | "pricing" | "users";

export default function AdminPage() {
    const { data: session } = useSession();
    const [page, setPage] = useState<PagesType>("bookings");

    if (session && session.user.role === "admin")
        return (
            <>
                <NavBarSpacer />
                <div className="flex min-h-screen w-full justify-between ">
                    <SideBar page={page} setPage={setPage} />

                    <div className="m-5 w-full">
                        {page === "bookings" && <ManageBookings />}
                        {page === "pricing" && <ManagePricing />}
                        {page === "users" && <ManageUsers />}
                    </div>
                </div>
            </>
        );

    return (
        <h1 className="m-auto text-5xl text-white">
            You are not authorized to view this page
        </h1>
    );
}
