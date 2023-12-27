import { useSession } from "next-auth/react";
import AdjustPricing from "~/components/Admin/AdjustPricing";
import GrantRole from "~/components/Admin/GrantRole";
import ManageBookings from "~/components/Admin/ManageBookings";
import NavBarSpacer from "~/components/NavBarSpacer";

export default function AdminPage() {
    const { data: session } = useSession();

    if (session && session.user.role === "admin")
        return (
            <>
                <NavBarSpacer />
                <div className="flex w-full justify-evenly">
                    <ManageBookings />
                    <AdjustPricing />
                    <GrantRole />
                </div>
            </>
        );

    return (
        <h1 className="m-auto text-5xl text-white">
            You are not authorized to view this page
        </h1>
    );
}
