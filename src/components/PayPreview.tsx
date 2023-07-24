import Link from "next/link";
import { useEffect } from "react";
import { useState } from "react";
import type { DateRange } from "react-day-picker";

const pricePerNight = 50;

const PayPreview = ({ selected }: { selected: DateRange | undefined }) => {
    const [dates, setDates] = useState<DateRange>(
        selected ? { ...selected } : { from: undefined, to: undefined }
    );
    const [disabled, setDisabled] = useState(true);
    console.log(dates);
    useEffect(
        () =>
            setDates(
                selected ? { ...selected } : { from: undefined, to: undefined }
            ),
        [selected]
    );

    useEffect(
        () => setDisabled(dates.from === undefined || dates.to === undefined),
        [dates]
    );

    const getNumberOfNights = (): number | null => {
        if (dates.from && dates.to) {
            const timeDiff = Math.abs(
                dates.to.getTime() - dates.from.getTime()
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
        console.log("WE DID IT");
        // TODO: Implement the createBooking function
    };

    const verifyBooking = () => {
        const dateData = { dates };

        if (dates) {
            //TODO: TRPC api call
            const conflictingAppointments = {
                where: dateData,
            };

            if (!conflictingAppointments) {
                //TODO: TRPC api call
                const createAppointment = { booking: dateData };
                console.log("Success");
            } else {
                console.log("Error", dates);
            }
        } else {
            console.log("Error");
        }
    };

    return (
        <div className="flex w-52 flex-col rounded-lg bg-white p-4 text-slate-800 shadow-3xl">
            <h2 className="text-center text-lg font-semibold">
                Booking Preview
            </h2>

            <div className="mt-4">
                <p>Arrive on: {dates.from?.toLocaleDateString()}</p>
                <p>Depart on: {dates.to?.toLocaleDateString()}</p>
            </div>

            <div className="mt-4">
                <div>Service Fee: etc...</div>
                <p>Total: {`$${getTotalCost() ?? "..."}`}</p>
            </div>

            <div className="mt-4 flex justify-center">
                <Link
                    href={{
                        pathname: "/confirmation",
                        query: {
                            startDate: dates.from?.getTime(),
                            endDate: dates.to?.getTime(),
                            totalPrice: `${getTotalCost() ?? 0}`,
                        },
                    }}
                >
                    <button
                        onClick={createBooking}
                        disabled={disabled}
                        className=" rounded-lg bg-blue-500 px-4 py-2 text-white transition-all duration-200 hover:scale-105 hover:bg-blue-600 disabled:bg-slate-300 disabled:text-slate-500"
                    >
                        Book now
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default PayPreview;
