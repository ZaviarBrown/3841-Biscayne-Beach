import { useState } from "react";
import { useModalContext } from "~/context/ModalContext";

export default function RevertPendingBooking() {
    const { closeModal, submitModal } = useModalContext();
    const [confirmIrreversible, setConfirmIrreversible] = useState(false);

    return (
        <div className="flex flex-col items-center justify-between overflow-hidden overflow-y-auto">
            <div className="mx-5 flex w-full justify-center rounded-t-2xl border-b border-slate-400 bg-slate-200 p-5 font-bold text-red-600">
                <h1 className="text-3xl md:text-4xl">Are you sure?</h1>
            </div>
            <div className="mx-5 flex min-h-52 flex-col justify-around p-2">
                <h2 className="text-center text-2xl md:text-3xl">
                    This action will take your dates off hold.
                </h2>

                <div className="flex p-3">
                    <input
                        checked={confirmIrreversible}
                        onChange={(e) =>
                            setConfirmIrreversible(e.target.checked)
                        }
                        type="checkbox"
                        className="mx-3"
                        id="confirm"
                    />
                    <label
                        htmlFor="confirm"
                        className="w-fit text-lg md:text-xl"
                    >
                        {`I understand that someone else may be able to select these dates.`}
                    </label>
                </div>
            </div>
            <div className="mt-5 flex w-full justify-around gap-5 rounded-b-2xl border-t border-slate-400 bg-slate-200 p-5 font-bold md:text-xl">
                <button
                    className="rounded-md bg-blue-600 px-2 py-2 text-white shadow-xl duration-200 hover:-translate-y-0.5 md:px-4"
                    onClick={closeModal}
                >
                    Oops Nevermind!
                </button>
                <button
                    className="rounded-md bg-red-600 px-2 py-2 text-white shadow-xl duration-200 hover:-translate-y-0.5 disabled:bg-gray-300 disabled:shadow-none disabled:hover:translate-y-0 md:px-4"
                    disabled={!confirmIrreversible}
                    onClick={submitModal}
                >
                    ⚠️ Cancel Booking ⚠️
                </button>
            </div>
        </div>
    );
}
