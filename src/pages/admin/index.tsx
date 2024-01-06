import { useSession } from "next-auth/react";
import { useState } from "react";
import AdjustPricing from "~/components/Admin/AdjustPricing";
import GrantRole from "~/components/Admin/GrantRole";
import ManageBookings from "~/components/Admin/ManageBookings";
import SideBar from "~/components/Admin/SideBar";
import NavBarSpacer from "~/components/NavBarSpacer";

export type PagesType = "bookings" | "pricing" | "users";

export default function AdminPage() {
    const { data: session } = useSession();
    const [page, setPage] = useState<PagesType>("bookings");

    if (session && session.user.role === "admin")
        return (
            <>
                <NavBarSpacer />
                <div className="flex w-full justify-between bg-slate-500">
                    <SideBar page={page} setPage={setPage} />

                    <div className="w-4/6">
                        {page === "bookings" && <ManageBookings />}
                        {page === "pricing" && <AdjustPricing />}
                        {page === "users" && <GrantRole />}
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
