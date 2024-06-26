import { useModalContext } from "~/context/ModalContext";

export default function ConfirmRoleChangeModal({
    name,
    currentRole,
    newRole,
}: {
    name: string | null;
    currentRole: string;
    newRole: string;
}) {
    const { closeModal, submitModal } = useModalContext();

    return (
        <div className="flex flex-col items-center justify-between overflow-hidden overflow-y-auto">
            <div className="mx-5 flex w-full justify-between rounded-t-2xl border-b border-slate-400 bg-slate-200 p-5 font-bold">
                <h1 className="text-3xl">Confirm Role Change</h1>
                <button
                    onClick={closeModal}
                    className="rounded-full border-2 border-blue-500 px-2 text-2xl font-extrabold shadow-md shadow-blue-300"
                >
                    X
                </button>
            </div>
            <div className="mx-5 flex min-h-32 flex-col justify-around">
                <h2 className="text-center text-2xl">
                    Are you sure you want to change{" "}
                    {name ? name + "'s" : "this user's"} role from{" "}
                    {<span className="font-bold">{currentRole}</span>} to{" "}
                    {<span className="font-bold">{newRole}</span>}?
                </h2>
                <h2 className="text-center text-2xl">
                    (This is always reversible later.)
                </h2>
            </div>
            <div className="mt-5 flex w-full justify-around rounded-b-2xl border-t border-slate-400 bg-slate-200 p-5 font-bold">
                <button
                    className="rounded-md bg-red-600 px-4 py-2 text-white shadow-xl duration-200 hover:-translate-y-0.5"
                    onClick={closeModal}
                >
                    On second thought...
                </button>
                <button
                    className="rounded-md bg-green-600 px-4 py-2 text-white shadow-xl duration-200 hover:-translate-y-0.5"
                    onClick={submitModal}
                >
                    {"Change that role!"}
                </button>
            </div>
        </div>
    );
}
