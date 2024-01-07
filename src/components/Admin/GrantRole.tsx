import { useSession } from "next-auth/react";
import { useState } from "react";
import { api } from "~/utils/api";

export default function GrantRole() {
    const { update } = useSession();
    const [email, setEmail] = useState("");

    const { mutate } = api.user.createNewAdmin.useMutation({
        onSuccess: () => {
            void update();
        },
    });

    return (
        <form className="flex flex-col items-center gap-10 rounded-lg p-5 text-slate-800 ">
            <h1 className="text-center text-3xl">Pre-create a User as Admin</h1>
            <input
                className="rounded-lg p-2 outline outline-1 outline-black"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button
                className="rounded-lg bg-green-500 px-3 py-2 text-xl text-white shadow-3xl"
                onClick={(e) => {
                    e.preventDefault();
                    mutate(email);
                }}
            >
                Create New Admin
            </button>
        </form>
    );
}
