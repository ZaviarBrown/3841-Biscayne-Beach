import { useState } from "react";
import { useModalContext } from "~/context/ModalContext";

export default function RevertPendingBooking() {
    const { closeModal, submitModal } = useModalContext();
    const [confirmIrreversible, setConfirmIrreversible] = useState(false);

    return (
        <div className="flex h-full flex-col items-center justify-between overflow-hidden overflow-y-auto">
            <div className="mx-5 flex w-full justify-center rounded-t-2xl border-b border-slate-400 bg-slate-200 p-5 font-bold text-red-600">
                <h1 className="text-4xl">Are you sure?</h1>
            </div>
            <div className="mx-5 flex h-52 flex-col justify-around">
                <h2 className="text-center text-3xl">
                    This action will take your dates off hold.
                </h2>

                <label className="w-fit text-xl">
                    <input
                        checked={confirmIrreversible}
                        onChange={(e) =>
                            setConfirmIrreversible(e.target.checked)
                        }
                        type="checkbox"
                        className="mx-5"
                    />
                    {`I understand that someone else may be able to select these dates.`}
                </label>
            </div>
            <div className="mt-5 flex w-full justify-around rounded-b-2xl border-t border-slate-400 bg-slate-200 p-5 font-bold">
                <button
                    className="rounded-md bg-blue-600 px-4 py-2 text-white shadow-xl duration-200 hover:-translate-y-0.5"
                    onClick={closeModal}
                >
                    Oops Nevermind!
                </button>
                <button
                    className="rounded-md bg-red-600 px-4 py-2 text-white shadow-xl duration-200 hover:-translate-y-0.5 disabled:bg-gray-300 disabled:shadow-none disabled:hover:translate-y-0"
                    disabled={!confirmIrreversible}
                    onClick={submitModal}
                >
                    ⚠️ Cancel Booking ⚠️
                </button>
            </div>
        </div>
    );
}
