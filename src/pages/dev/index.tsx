import { useEffect, useState } from "react";
import { api } from "~/utils/api";
import type { RouterOutputs } from "~/utils/api";

type AllUsersType = RouterOutputs["users"]["getAll"];

export default function Dev() {
    const [users, setUsers] = useState<AllUsersType>([]);

    const ctx = api.useContext();
    const { data } = api.users.getAll.useQuery();
    const { mutate } = api.users.createAdmin.useMutation({
        onSuccess: () => ctx.users.getAll.invalidate(),
    });

    useEffect(() => {
        if (data) setUsers(data);
    }, [data]);
    return (
        <div>
            <button onClick={() => mutate("brown.zaviar@gmail.com")}>
                Test user create
            </button>

            {users.map((userObj) => {
                return (
                    <div key={userObj.id}>
                        <div>Id: {userObj.id}</div>
                        <div>Email: {userObj.email}</div>
                        <div>Role: {userObj.role} </div>
                    </div>
                );
            })}
        </div>
    );
}
