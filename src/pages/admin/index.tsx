import AdjustPricing from "~/components/Admin/AdjustPricing";
import GrantRole from "~/components/Admin/GrantRole";
import ManageBookings from "~/components/Admin/ManageBookings";

export default function AdminPage() {
    return (
        <div className="flex h-full justify-center">
            <ManageBookings />
            <div>
                <AdjustPricing />
                <GrantRole />
            </div>
        </div>
    );
}
