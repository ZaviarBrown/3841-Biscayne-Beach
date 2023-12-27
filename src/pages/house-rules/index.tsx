import NavBarSpacer from "~/components/NavBarSpacer";

export default function HouseRules() {
    const rules = [
        "No pets",
        "No smoking on property",
        "No parties / gatherings",
        "No loud noises or music",
        "No fishing in the ponds",
        "No bait inside the house",
        "No banners, signs or flags",
        "No firearms",
        "No illegal substances",
        "Park in the driveway or under the house (concrete) only",
    ];

    const checkout = [
        "Please remove everything you brought including refrigerated food, trash, and consumable products",
        "Upon checkout, please bundle used bedclothes on the floor and we will wash them for the next guest",
        "Please start the dishwasher for us",
        "Please leave things as you found them",
        "All trash should be taken out in bags and tied up",
        "Please do not throw loose trash in the cans and do not overfill the cans",
        "If you have more trash than the cans hold, leave it in bags tied up on the deck by the front steps",
    ];

    return (
        <>
            <NavBarSpacer />

            <div className="m-5 flex flex-wrap justify-evenly gap-5 p-5">
                <div className="w-1/3 min-w-[500px] flex-grow rounded-lg bg-white text-2xl text-slate-800 shadow-3xl">
                    <h1 className="rounded-t-lg bg-orange-100 p-5 text-center text-3xl">
                        Please follow all Neighborhood Rules & please be
                        considerate of our neighbors right to peace and quiet.
                    </h1>
                    <ul className="mx-10 my-5 pl-5">
                        {rules.map((rule, i) => (
                            <li className="list-disc" key={`Rule #${i + 1}`}>
                                {rule}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="w-1/3 min-w-[500px] flex-grow rounded-lg bg-white text-2xl text-slate-800 shadow-3xl">
                    <h1 className="rounded-t-lg bg-orange-100 p-5 text-center text-3xl">
                        Please follow checkout procedures and leave the house
                        like you found it.
                    </h1>
                    <ul className="mx-10 my-5 pl-5">
                        {checkout.map((procedure, i) => (
                            <li
                                className="list-disc"
                                key={`Checkout #${i + 1}`}
                            >
                                {procedure}
                            </li>
                        ))}
                    </ul>
                </div>
                <iframe
                    className="h-screen w-3/4"
                    src="/assets/RentersRules.pdf"
                />
            </div>
        </>
    );
}
