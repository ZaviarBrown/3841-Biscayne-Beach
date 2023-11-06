import CreateBooking from "~/components/Booking/Create";

export default function BookPage() {
    return (
        <>
            <h2 className="text-5xl">Select your dates</h2>
            <p className="text-3xl">5 night minimum</p>
            <CreateBooking />
        </>
    );
}
