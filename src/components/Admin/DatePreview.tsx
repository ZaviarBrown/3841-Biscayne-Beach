import { differenceInCalendarDays } from "date-fns";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { api } from "~/utils/api";

import type { DateRange } from "react-day-picker";
import BookingConfirmationEmail from "~/emails/BookingConfirmation";
import { render } from "@react-email/render";
import type { SubPagesType } from "./ManageBookings";
import { PulseLoader } from "react-spinners";
const AdminDatePreview = ({
    selected,
    setSubPage,
}: {
    selected: DateRange;
    setSubPage: React.Dispatch<React.SetStateAction<SubPagesType>>;
}) => {
    const { data: session } = useSession();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [numberOfNights, setNumberOfNights] = useState(0);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const ctx = api.useContext();
    const { mutate: createAdminBooking } = api.booking.adminCreate.useMutation({
        onSuccess: () => {
            void ctx.booking.invalidate();
            setSubPage("upcoming");
        },
    });

    const handleSubmit = (): void => {
        const { from, to } = selected;

        if (from && to && session && session.user) {
            setHasSubmitted(true);

            const bookingInfo = {
                userId: session?.user.id,
                name,
                email,
                startDate: from,
                endDate: to,
                price: 0,
                numberOfNights,
            };

            createAdminBooking({
                bookingInfo,
                emailInfo: {
                    to: email,
                    subject: "Booking Confirmation",
                    html: render(<BookingConfirmationEmail {...bookingInfo} />),
                },
            });
        }
    };

    useEffect(() => {
        if (session && session.user.name) {
            setName(session.user.name);
        }
        if (session && session.user.email) {
            setEmail(session.user.email);
        }
    }, [session]);

    useEffect(() => {
        const { from, to } = selected;
        if (from && to) setNumberOfNights(differenceInCalendarDays(to, from));
        else setNumberOfNights(0);
    }, [selected]);

    return (
        <div className="flex h-full flex-col justify-between border-l-2 border-slate-200 bg-white p-2 pl-14 text-xl text-black">
            <div>
                <h2 className="text-center text-3xl font-semibold">
                    Booking Preview
                </h2>
            </div>
            <div className="w-full self-center border border-slate-200" />
            <label className="w-3/4 self-center">
                Who is this booking for?
                <br />
                <input
                    placeholder={"First and last name"}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="my-2 w-full rounded px-1 outline outline-1 outline-slate-200 focus:outline-slate-400"
                />
            </label>
            <label className="w-3/4 self-center">
                Where should the confirmation email be sent?
                <br />
                <input
                    placeholder={"Email"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="my-2 w-full rounded px-1 outline outline-1 outline-slate-200 focus:outline-slate-400"
                />
            </label>
            <div className="w-full self-center border border-slate-200" />

            <span className="flex flex-wrap justify-around">
                <p>Check-in: </p> <p>{selected.from?.toLocaleDateString()}</p>
            </span>

            <span className="flex flex-wrap justify-around">
                <p>Check-out: </p> <p>{selected.to?.toLocaleDateString()}</p>
            </span>

            <div className="w-full self-center border border-slate-200" />

            <span className="flex flex-wrap justify-around">
                <p>Total: $0.00</p>
            </span>

            <div className="flex justify-center">
                <button
                    onClick={handleSubmit}
                    disabled={
                        !name ||
                        !email ||
                        !selected.from ||
                        !selected.to ||
                        hasSubmitted
                    }
                    className={`w-1/2 rounded-lg bg-blue-500 px-4 py-2 text-white transition-all duration-200 hover:scale-105 hover:bg-blue-600 disabled:scale-100 ${
                        hasSubmitted
                            ? "disabled:bg-blue-300"
                            : "disabled:bg-slate-400"
                    } disabled:text-slate-500`}
                >
                    {hasSubmitted ? (
                        <PulseLoader
                            size={10}
                            color="white"
                            className="m-auto"
                        />
                    ) : (
                        "Continue"
                    )}
                </button>
            </div>
        </div>
    );
};

export default AdminDatePreview;
