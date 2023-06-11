import { useEffect } from "react";
import { useState } from "react";
import type { DateRange } from "react-day-picker";

const pricePerNight = 50;

const PayPreview = ({ selected }: { selected: DateRange | undefined }) => {
    const [dates, setDates] = useState<DateRange>(
        selected ? { ...selected } : { from: undefined, to: undefined }
    );
    const [disabled, setDisabled] = useState(true);

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
        // This function will be executed when the "Book now" button is clicked
        // You can add the desired logic for creating the booking here
    };

    return (
        <div className="rounded-lg bg-white p-4 text-slate-800 shadow-2xl">
            <h2 className="text-lg font-semibold">Booking Preview</h2>

            <div className="mt-4">
                <p>Arrive on: {dates.from?.toLocaleDateString()}</p>
                <p>Depart on: {dates.to?.toLocaleDateString()}</p>
            </div>

            <div className="mt-4">
                <div>Service Fee: </div>
                <p>
                    Total: {getTotalCost() ? `$${getTotalCost() ?? 0}` : "N/A"}
                </p>
            </div>

            <button
                onClick={createBooking}
                disabled={disabled}
                className="mt-4 rounded-lg bg-blue-500 px-4 py-2 text-white transition-all duration-200 hover:scale-105 hover:bg-blue-600 disabled:bg-slate-300 disabled:text-slate-500"
            >
                Book now
            </button>
        </div>
    );
};

export default PayPreview;
