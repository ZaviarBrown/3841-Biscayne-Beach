import Image from "next/image";
import Link from "next/link";

export default function Dev() {
    return (
        <div className="flex h-screen max-w-full flex-col overflow-hidden">
            <div className="flex flex-col gap-8 md:flex-row">
                <div className="md:w-2/3">
                    <h1 className="text-4xl font-bold">
                        <span>Feel at Home</span>
                    </h1>
                    <p className="mt-4 text-gray-700">
                        {`
                                Live the way you've always wanted without
                                compromising style or quality. At The Carson, our
                                large brand new construction homes are designed with
                                you in mind. With impressive finishes, two-car
                                direct access garages, and great amenities, our
                                brand-new construction homes make it possible to
                                live beyond your expectations. Walk out your front
                                door to Gilbert Town Square for a meal at your
                                favorite restaurant or take a short bike ride to the
                                famed Heritage District or a short drive to Downtown
                                Chandler for world-class dining & entertainment. The
                                Carson is the perfect place to call home.
                            `}
                    </p>
                </div>

                <div className="flex flex-col gap-4 md:w-1/3">
                    <Link
                        className="rounded-lg bg-blue-600 px-4 py-2 text-center text-white hover:bg-blue-700"
                        href="/amenities/"
                    >
                        <p className="">View Amenities</p>
                    </Link>
                    <Link
                        className="rounded-lg bg-blue-600 px-4 py-2 text-center text-white hover:bg-blue-700"
                        href="/gallery/"
                    >
                        <p className="">View Gallery</p>
                    </Link>
                </div>
            </div>
            <div className="flex aspect-[3/2] w-full flex-col md:aspect-[3/1] md:flex-row">
                <div className="md:clip-tr clip-br relative h-full w-full overflow-hidden bg-cover bg-center md:h-auto md:w-1/2">
                    <Image
                        className="object-cover object-right-bottom"
                        src={"/images/house.jpg"}
                        alt={"0"}
                        fill
                    />
                </div>
                <div className="md:clip-tl clip-tl relative -mt-[7%] h-full w-full overflow-hidden bg-cover bg-center md:mt-0 md:h-auto md:w-1/2">
                    <Image
                        className="object-cover object-left-bottom"
                        src={"/images/house.jpg"}
                        alt={"0"}
                        fill
                    />
                </div>
            </div>
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
