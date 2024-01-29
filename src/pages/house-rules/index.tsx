import Link from "next/link";
import NavBarSpacer from "~/components/NavBarSpacer";

export default function HouseRules() {
    const rules = [
        "No pets.",
        "No smoking on property.",
        "No parties / gatherings.",
        "No loud noises or music.",
        "No fishing in the ponds.",
        "No bait inside the house.",
        "No banners, signs or flags.",
        "No firearms.",
        "No illegal substances.",
        "Park in the driveway or under the house (concrete) only.",
    ];

    const checkout = [
        "Contactless check-in at 3pm, check-out at 11am.",
        "Your host is local for your assistance and to ensure the rules are followed.",
        "You will be provided the gate code and door code within 48 hours of your stay.",
        "Please remove everything you brought including refrigerated food, trash, and consumable products.",
        "Upon checkout, please bundle used bedclothes on the floor and we will wash them for the next guest.",
        "Please start the dishwasher for us and leave things as you found them.",
        "All trash should be taken out in bags and tied up.",
        "Please do not throw loose trash in the cans and do not overfill the cans.",
        "If you have more trash than the cans hold, leave it in bags tied up on the deck by the front steps.",
        "No Cheetos. People who turn their kids loose with a bag of Cheetos inside the house will be charged additional cleaning fee, fined, and flogged.",
    ];

    const policies = [
        "By booking with us, you agree to follow all rules listed on this page.",
        "You must be 25 to book a reservation through this site.",
        "There must be an equal ratio of Adult guests over 25 to prevent unwanted adolescent parties.",
        "Purchases through our platform are 100% handled by Stripe; we never see your card info.",
        "Stripe charges a card processing fee for every transaction. We cover this fee when you book with us, but this fee is non-refundable for cancellations. Card processing fees are non-refundable.",
        "Once selected, your dates are reserved for 15 minutes so you can complete your purchase. If you do not complete your purchase during that time, your booking will be deleted and you will not be charged.",
        "There is a 5 night minimum for every booking.",
        "You must pay for the entirety of your stay at the time of booking.",
        "Bookings cancelled with more than 14 days notice will receive a full refund.",
        "Bookings cancelled with at least 3 days notice will receive a refund equivalent to 50% of the total booking cost.",
        "Bookings cancelled with less than 3 days notice will receive no refund.",
        <>
            If you wish to cancel a Booking, you can do so on the{" "}
            {
                <Link
                    className="text-blue-500 hover:underline"
                    href={"/your-bookings"}
                >
                    Your Bookings
                </Link>
            }{" "}
            page.
        </>,
    ];

    return (
        <>
            <NavBarSpacer />

            <div className="m-5 flex flex-col items-center gap-10 p-5">
                <div className="w-3/4 min-w-[350px] flex-grow rounded-lg bg-white text-2xl text-slate-800 shadow-3xl">
                    <h1 className="rounded-t-lg bg-slate-700 p-5 text-center text-3xl text-white">
                        Please follow all Neighborhood Rules & please be
                        considerate of our neighbors right to peace and quiet.
                    </h1>
                    <div className="m-auto w-4/5 p-5">
                        <ul className="grid grid-cols-2 gap-x-10">
                            {rules.map((rule, i) => (
                                <li
                                    className="m-2 list-disc"
                                    key={`Rule #${i + 1}`}
                                >
                                    {rule}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="w-3/4 min-w-[350px] flex-grow rounded-lg bg-white text-2xl text-slate-800 shadow-3xl">
                    <h1 className="rounded-t-lg bg-slate-700 p-5 text-center text-3xl text-white">
                        Please follow check-in/out procedures and leave the
                        house like you found it.
                    </h1>
                    <div className="m-auto w-4/5 p-5">
                        <ul className="grid grid-cols-2 gap-x-10">
                            {checkout.map((procedure, i) => (
                                <li
                                    className="m-2 list-disc"
                                    key={`Checkout #${i + 1}`}
                                >
                                    {procedure}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="w-3/4 min-w-[350px] flex-grow rounded-lg bg-white text-2xl text-slate-800 shadow-3xl">
                    <h1 className="rounded-t-lg bg-slate-700 p-5 text-center text-3xl text-white">
                        Please note our Booking & Cancellation policies before
                        purchasing your booking.
                    </h1>
                    <div className="m-auto w-4/5 p-5">
                        <ul className="grid grid-cols-2 gap-x-10">
                            {policies.map((policy, i) => (
                                <li
                                    className="m-2 list-disc"
                                    key={`Policy #${i + 1}`}
                                >
                                    {policy}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <iframe
                    className="h-screen w-3/4"
                    src="/assets/RentersRules.pdf"
                />
            </div>
        </>
    );
}
