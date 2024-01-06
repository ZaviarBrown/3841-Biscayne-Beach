import GrantRole from "./GrantRole";

export default function ManageUsers() {
    return (
        <div>
            <InfoCard />
            <GrantRole />
        </div>
    );
}

const InfoCard = () => {
    return (
        <div className="flex w-full items-center justify-evenly rounded-lg bg-white p-3 text-center shadow-lg">
            <div>
                <p className="text-2xl">{"👤"}</p>
                <span className="text-2xl font-bold">0</span>
                <p className="text-sm text-slate-500">Total Users</p>
            </div>
            <span className="h-20 border-r" />
            <div>
                <p className="text-2xl">{"🎉"}</p>
                <span className="text-2xl font-bold">0</span>
                <p className="text-sm text-slate-500">New Users This Year</p>
            </div>
            <span className="h-20 border-r" />
            <div>
                <p className="text-2xl">{"🔐"}</p>
                <span className="text-2xl font-bold">0</span>
                <p className="text-sm text-slate-500">Admins</p>
            </div>
        </div>
    );
};
