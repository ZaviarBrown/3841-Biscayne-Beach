import Link from "next/link";
import { useState } from "react";
import { useModalContext } from "~/context/ModalContext";
import { convertCentsIntoDollars } from "~/utils/booking";

export default function UserConfirmDeleteBookingModal({
    refundPrice,
    startDate,
    endDate,
}: {
    refundPrice: number;
    startDate: Date;
    endDate: Date;
}) {
    const { closeModal, submitModal } = useModalContext();
    const [confirmUser, setConfirmUser] = useState(false);
    const [confirmRefund, setConfirmRefund] = useState(false);
    const [confirmIrreversible, setConfirmIrreversible] = useState(false);

    return (
        <div className="flex h-full flex-col items-center justify-between overflow-hidden overflow-y-auto">
            <div className="mx-5 flex w-full justify-center rounded-t-2xl border-b border-slate-400 bg-slate-200 p-5 font-bold text-red-600">
                <h1 className="text-4xl">WARNING!</h1>
            </div>
            <div className="mx-5 flex h-full flex-col justify-around">
                <h2 className="text-center text-3xl">
                    This action is PERMANENT
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
                    {`I understand that this CANNOT be undone.`}
                </label>
                <label className="w-fit text-xl">
                    <input
                        checked={confirmRefund}
                        onChange={(e) => setConfirmRefund(e.target.checked)}
                        type="checkbox"
                        className="mx-5"
                    />
                    {`I acknowledge that a refund of ${convertCentsIntoDollars(
                        refundPrice
                    )} will be issued to me through Stripe as per the `}
                    <Link
                        className="hover:text-blue-500 hover:underline"
                        href={"/house-rules"}
                    >
                        Cancellation Policy.
                    </Link>
                </label>

                <label className="w-fit text-xl">
                    <input
                        checked={confirmUser}
                        onChange={(e) => setConfirmUser(e.target.checked)}
                        type="checkbox"
                        className="mx-5"
                    />
                    {`I verified that the booking for ${startDate.toLocaleDateString()} to ${endDate.toLocaleDateString()} is the correct booking to delete.`}
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
                    disabled={
                        !confirmUser || !confirmRefund || !confirmIrreversible
                    }
                    onClick={submitModal}
                >
                    ⚠️ Delete Booking ⚠️
                </button>
            </div>
        </div>
    );
}