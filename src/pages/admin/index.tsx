import AdjustPricing from "~/components/Admin/AdjustPricing";
import GrantRole from "~/components/Admin/GrantRole";
import ManageBookings from "~/components/Admin/ManageBookings";
import NavBarSpacer from "~/components/NavBarSpacer";

export default function AdminPage() {
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
}
