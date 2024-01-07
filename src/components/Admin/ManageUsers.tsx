import { api } from "~/utils/api";
import GrantRole from "./GrantRole";

export default function ManageUsers() {
    const ctx = api.useContext();
    const { data: users } = api.user.getAll.useQuery();
    const { mutate: changeRole } = api.user.changeRole.useMutation({
        onSuccess: () => {
            void ctx.user.invalidate();
        },
    });

    return (
        <div className="flex h-full flex-col gap-5">
            <InfoCard />
            <div className="flex h-full rounded-lg bg-slate-100 text-black shadow-3xl">
                <div className="w-4/5 border-r border-slate-400">
                    <div className="grid grid-cols-5 border-y border-slate-400 bg-slate-300 p-2 text-center font-semibold ">
                        <p>Name</p>
                        <p>Email</p>
                        <p>Role</p>
                        <p># of Bookings</p>
                        <p>Action</p>
                    </div>
                    {users &&
                        users.map(({ id, name, email, role }, i) => {
                            return (
                                <div
                                    className={`grid h-fit grid-cols-5  items-center p-2 text-center ${
                                        i % 2 ? "bg-slate-200" : "bg-white"
                                    }`}
                                    key={id}
                                >
                                    <p>{name}</p>
                                    <p>{email}</p>
                                    <p>{role}</p>
                                    <p>?</p>
                                    <button
                                        className={`m-auto w-fit rounded-lg ${
                                            role === "admin"
                                                ? "bg-red-500"
                                                : "bg-green-500"
                                        } px-5 py-2 text-slate-50 shadow-xl duration-200 hover:scale-105 ${
                                            role === "admin"
                                                ? "hover:bg-red-600"
                                                : "hover:bg-green-600"
                                        } `}
                                        onClick={() =>
                                            changeRole({
                                                id,
                                                role:
                                                    role === "admin"
                                                        ? "user"
                                                        : "admin",
                                            })
                                        }
                                    >
                                        {role === "admin"
                                            ? "Demote"
                                            : "Promote"}
                                    </button>
                                </div>
                            );
                        })}
                </div>
                <div className="w-1/5">
                    <GrantRole />
                </div>
            </div>
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
