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
        <form className="m-5 flex w-96 flex-col items-center gap-10 rounded-lg bg-white px-10 py-5 text-slate-800 shadow-3xl">
            <h1 className="text-3xl">Grant Admin Role</h1>
            <input
                className="rounded-lg p-2 outline outline-1 outline-black"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button
                className="rounded-lg bg-green-500 px-5 py-2 text-xl text-white shadow-3xl"
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
