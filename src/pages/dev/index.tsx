import Image from "next/image";
import Link from "next/link";

export default function Dev() {
    return (
        <div className="flex items-center justify-center py-8">
            {/* Left Line */}
            <div className="flex-grow border-t border-gray-300"></div>

            {/* Buttons */}
            <div className="mx-6 flex space-x-4">
                <a
                    href="/schedule-a-tour/"
                    target="_self"
                    className="bg-black px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-gray-800"
                >
                    Book A Tour
                </a>
                <a
                    href="https://carsontownhomes.securecafe.com/onlineleasing/carson-the/floorplans.aspx"
                    target="_blank"
                    className="bg-black px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-gray-800"
                >
                    Apply Today
                </a>
            </div>

            {/* Right Line */}
            <div className="flex-grow border-t border-gray-300"></div>
        </div>
    );
}

// ? ---------------------------------------------------------------------------
// * ----- House Rules
// ? ---------------------------------------------------------------------------

// import Header from '~/components/Header';

// export default function Dev() {
//     const rules = [
//         'No excess sand in the home. Please utilize the outdoor shower upon returning from the beach and entering the home',

//         'No food and only water in bedrooms- especially bunks (An additional cleaning fee may be assessed to the renter for spills, stained linens, or stained mattresses)',

//         'The BBQ grill may be used on the ground level only. Failure to comply will result in immediate eviction',

//         'Vehicles may be parked on the concrete in front and under the home only (No street parking)',

//         'No bait inside the home',

//         'No flags or banners',

//         'No pets',

//         'No parties',

//         'No fishing in the ponds in the Biscay neighborhood (this is a subdivision rule that all homeowners and renters must follow)',

//         'Leave home as clean & organized as you found it',
//     ];

//     return (
//         <>
//             <Header title={'House Rules'} imageNum={10} />
//             <div className="m-5 flex items-center gap-10 p-5">
//                 <div className="w-3/4 min-w-[350px] flex-grow rounded-lg bg-white text-base text-slate-800 shadow-3xl md:text-2xl">
//                     <div className="rounded-t-lg bg-[#034078] p-2 text-center text-lg text-white md:text-3xl" />
//                     <h1 className="text-center text-[#034078]">
//                         Please follow all Neighborhood Rules & please be
//                         considerate of our neighbors right to peace and quiet.
//                     </h1>
//                     <div className="m-auto w-4/5 p-5">
//                         <ul className="flex flex-col">
//                             {rules.map((rule, i) => (
//                                 <li
//                                     className="m-2 list-disc"
//                                     key={`Rule #${i + 1}`}
//                                 >
//                                     {rule}
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>
//                 </div>
//                 <div className="w-3/4 min-w-[350px] flex-grow rounded-lg bg-white text-base text-slate-800 shadow-3xl md:text-2xl">
//                     <div className="rounded-t-lg bg-[#034078] p-2 text-center text-lg text-white md:text-3xl" />
//                     <h1>
//                         Please follow all Neighborhood Rules & please be
//                         considerate of our neighbors right to peace and quiet.
//                     </h1>
//                     <div className="m-auto w-4/5 p-5">
//                         <ul className="grid grid-cols-1 gap-x-10 md:grid-cols-2">
//                             {rules.map((rule, i) => (
//                                 <li
//                                     className="m-2 list-disc"
//                                     key={`Rule #${i + 1}`}
//                                 >
//                                     {rule}
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }
