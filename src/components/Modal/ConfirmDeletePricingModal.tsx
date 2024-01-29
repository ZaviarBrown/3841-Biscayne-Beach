import { useModalContext } from "~/context/ModalContext";

export default function ConfirmDeletePricingModal() {
    const { closeModal, submitModal } = useModalContext();

    return (
        <div className="flex flex-col items-center justify-between overflow-hidden overflow-y-auto">
            <div className="mx-5 flex w-full justify-between rounded-t-2xl border-b border-slate-400 bg-slate-200 p-5 font-bold">
                <h1 className="text-3xl">Are You Sure?</h1>
                <button
                    onClick={closeModal}
                    className="rounded-full border-2 border-blue-500 px-2 text-2xl font-extrabold shadow-md shadow-blue-300"
                >
                    X
                </button>
            </div>
            <div className="mx-5 flex min-h-32 flex-col justify-around p-2">
                <h2 className="p-3 text-center text-3xl">
                    This action is permanent!
                </h2>
                <h2 className="text-center text-2xl">
                    If you need this pricing window later, you will have to
                    manually recreate this pricing window.
                </h2>
            </div>
            <div className="mt-5 flex w-full justify-around rounded-b-2xl border-t border-slate-400 bg-slate-200 p-5 font-bold">
                <button
                    className="rounded-md bg-red-600 px-4 py-2 text-white shadow-xl duration-200 hover:-translate-y-0.5"
                    onClick={closeModal}
                >
                    No get me out of here!
                </button>
                <button
                    className="rounded-md bg-green-600 px-4 py-2 text-white shadow-xl duration-200 hover:-translate-y-0.5"
                    onClick={submitModal}
                >
                    {"Yes I'm sure, delete it!"}
                </button>
            </div>
        </div>
    );
}
