import Link from "next/link";
import { useState } from "react";
import { useModalContext } from "~/context/ModalContext";

export default function ConfirmRulesModal() {
    const { closeModal, submitModal } = useModalContext();
    const [rules, setRules] = useState(false);
    const [terms, setTerms] = useState(false);

    return (
        <div className="flex h-full flex-col items-center justify-between overflow-hidden overflow-y-auto">
            <div className="mx-5 flex w-full justify-between rounded-t-2xl border-b border-slate-400 bg-slate-200 p-5 font-bold">
                <h1 className="text-3xl">Booking Agreement</h1>
                <button
                    onClick={closeModal}
                    className="rounded-full border-2 border-blue-500 px-2 text-2xl font-extrabold shadow-md shadow-blue-300"
                >
                    X
                </button>
            </div>
            <div className="mx-5 flex h-full flex-col justify-around">
                <h2 className="text-center text-2xl">
                    By booking with us, you agree to abide by the{" "}
                    <Link
                        href="/house-rules"
                        aria-label="privacy policy"
                        className="text-blue-400 underline"
                        onClick={() => closeModal()}
                    >
                        House Rules
                    </Link>{" "}
                    and our{" "}
                    <Link
                        href="/legal/terms-of-service"
                        aria-label="terms of service"
                        className="text-blue-400 underline"
                        onClick={() => closeModal()}
                    >
                        Terms of Service
                    </Link>
                </h2>
                <label className="w-fit text-xl">
                    <input
                        checked={rules}
                        onChange={(e) => setRules(e.target.checked)}
                        type="checkbox"
                        className="mx-5"
                    />
                    I agree to follow the House Rules
                </label>

                <label className="w-fit text-xl">
                    <input
                        checked={terms}
                        onChange={(e) => setTerms(e.target.checked)}
                        type="checkbox"
                        className="mx-5"
                    />
                    I agree to the Terms of Service
                </label>
            </div>
            <div className="mt-5 flex w-full justify-around rounded-b-2xl border-t border-slate-400 bg-slate-200 p-5 font-bold">
                <button
                    className="rounded-md bg-red-600 px-4 py-2 text-white shadow-xl duration-200 hover:-translate-y-0.5"
                    onClick={closeModal}
                >
                    Cancel
                </button>
                <button
                    className="rounded-md bg-green-600 px-4 py-2 text-white shadow-xl duration-200 hover:-translate-y-0.5 disabled:bg-gray-300 disabled:shadow-none disabled:hover:translate-y-0"
                    disabled={!rules || !terms}
                    onClick={submitModal}
                >
                    Continue
                </button>
            </div>
        </div>
    );
}
