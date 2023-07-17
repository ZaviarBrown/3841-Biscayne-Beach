const BookingSummary = () => {
    return (
        <div className="mb-6">
            <h2 className="mb-4 text-2xl font-bold">Booking Summary</h2>
            <div className="mb-4">
                <p className="mb-2 text-sm">Check-in</p>
                <p className="font-bold">July 24, 2023</p>
            </div>
            <div className="mb-4">
                <p className="mb-2 text-sm">Check-out</p>
                <p className="font-bold">July 28, 2023</p>
            </div>
            <div className="mb-4">
                <p className="mb-2 text-sm">Guests</p>
                <p className="font-bold">2 Adults</p>
            </div>
            <div className="mb-4">
                <p className="mb-2 text-sm">Total Cost</p>
                <p className="text-lg font-bold">$850.00</p>
            </div>
        </div>
    );
};

export default BookingSummary;
