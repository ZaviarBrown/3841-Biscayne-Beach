import { differenceInCalendarDays } from "date-fns";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import type { DateRange } from "react-day-picker";
import { api } from "~/utils/api";

const pricePerNight = 300;

const PayPreview = ({ selected }: { selected: DateRange }) => {
    const [disabled, setDisabled] = useState(true);
    const { data: session } = useSession();
    const router = useRouter();

    const { mutate } = api.booking.create.useMutation({
        onSuccess: () => {
            void router.push("/your-bookings");
        },
    });

    const getNumberOfNights = (): number | null => {
        if (selected.from && selected.to) {
            const timeDiff = Math.abs(
                selected.to.getTime() - selected.from.getTime()
            );
            const numberOfNights = Math.ceil(timeDiff / (1000 * 3600 * 24));
            return numberOfNights;
        }
        return null;
    };

    const getTotalCost = (): number | null => {
        const numberOfNights = getNumberOfNights();
        if (numberOfNights) {
            return numberOfNights * pricePerNight;
        }
        return null;
    };

    const createBooking = (): void => {
        const { from, to } = selected;

        if (session && session.user && from && to) {
            mutate({
                userId: session.user.id,
                name: session.user.name ?? "",
                email: session.user.email ?? "",
                startDate: from,
                endDate: to,
            });
        }
    };

    const verifyBooking = () => {
        const dateData = { selected };

        if (selected) {
            //TODO: TRPC api call
            const conflictingAppointments = {
                where: dateData,
            };

            if (!conflictingAppointments) {
                //TODO: TRPC api call
                const createAppointment = { booking: dateData };
                console.log("Success");
            } else {
                console.log("Error", selected);
            }
        } else {
            console.log("Error");
        }
    };

    useEffect(() => {
        if (
            !selected.from ||
            !selected.to ||
            differenceInCalendarDays(selected.to, selected.from) < 5
        )
            setDisabled(true);
        else setDisabled(false);
    }, [selected]);

    return (
        <div className="flex w-1/6 scale-125 transform flex-col justify-between rounded-lg bg-white p-4 text-slate-800 shadow-3xl">
            <h2 className="text-center text-lg font-semibold">
                Booking Preview
            </h2>

            <p>Arrive on: {selected.from?.toLocaleDateString()}</p>

            <p>Depart on: {selected.to?.toLocaleDateString()}</p>

            <p>Total: {`$${getTotalCost() ?? "..."}`}</p>

            <div className="mt-4 flex justify-center">
                <button
                    onClick={createBooking}
                    disabled={disabled}
                    className="rounded-lg bg-blue-500 px-4 py-2 text-white transition-all duration-200 hover:scale-105 hover:bg-blue-600 disabled:bg-slate-300 disabled:text-slate-500"
                >
                    Book now
                </button>
            </div>
        </div>
    );
};

export default PayPreview;
