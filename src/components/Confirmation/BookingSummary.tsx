import { format } from "date-fns";

const BookingSummary = ({
    startDate,
    endDate,
    totalPrice,
}: {
    startDate: string;
    endDate: string;
    totalPrice: string;
}) => {
    return (
        <div className="mb-6">
            <h2 className="mb-4 text-2xl font-bold">Booking Summary</h2>
            <div className="mb-4">
                <p className="mb-2 text-sm">Check-in</p>
                <p className="font-bold">
                    {startDate
                        ? format(new Date(Number(startDate)), "PPPP")
                        : "..."}
                </p>
            </div>
            <div className="mb-4">
                <p className="mb-2 text-sm">Check-out</p>
                <p className="font-bold">
                    {endDate
                        ? format(new Date(Number(endDate)), "PPPP")
                        : "..."}
                </p>
            </div>
            <div className="mb-4">
                <p className="mb-2 text-sm">Guests</p>
                <p className="font-bold">2 Adults</p>
            </div>
            <div className="mb-4">
                <p className="mb-2 text-sm">Total Cost</p>
                <p className="text-lg font-bold">${totalPrice}</p>
            </div>
        </div>
    );
};

export default BookingSummary;
