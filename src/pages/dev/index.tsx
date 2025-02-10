import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useMobileContext } from '~/context/MobileContext';
import { useScrollContext } from '~/context/ScrollContext';
import { carouselImages as images } from '~/data';
import HomeDetails from '~/components/Home/HomeDetails';

export default function Dev() {
    const { showCarousel } = useScrollContext();
    const { isMobile } = useMobileContext();
    const [currentImage, setCurrentImage] = useState(0);

    const nextImage = () => {
        setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    };

    const previousImage = () => {
        setCurrentImage(
            (prevImage) => (prevImage - 1 + images.length) % images.length
        );
    };

    useEffect(() => {
        if (!showCarousel) return;

        const interval = setInterval(() => {
            setCurrentImage((prevIndex) => (prevIndex + 1) % images.length);
        }, 4000);

        return () => clearInterval(interval);
    }, [currentImage, showCarousel]);

    // TODO: Image optimization

    return (
        <>
            <div className="relative flex h-[98vh] w-full flex-col items-center justify-between">
                {images.map(({ src, alt }, index) => (
                    <div
                        key={src}
                        className={`${
                            index === currentImage ? 'opacity-100' : 'opacity-0'
                        } fixed -z-10 h-full w-full transition-opacity duration-1000`}
                    >
                        <Image
                            src={src}
                            alt={alt}
                            className="scale-125 object-scale-down"
                            fill
                        />
                        <Image
                            src={src}
                            alt={alt}
                            className="-z-20 object-cover blur"
                            fill
                        />
                    </div>
                ))}
                <div className="absolute top-0 h-1/2 w-full bg-gradient-to-b from-black to-transparent opacity-60" />
                <div className="absolute bottom-0 h-1/2 w-full bg-gradient-to-b from-transparent to-black opacity-60" />

                {/* Spacer */}
                <div />
                {/* Spacer */}

                <div className="flex w-full justify-between">
                    <button
                        onClick={previousImage}
                        className="mx-5 rounded-md bg-black px-4 py-2 text-white opacity-50 duration-200 hover:opacity-90"
                    >
                        {'<'}
                    </button>

                    <button
                        onClick={nextImage}
                        className="mx-5 rounded-md bg-black px-4 py-2 text-white opacity-50 duration-200 hover:opacity-90"
                    >
                        {'>'}
                    </button>
                </div>

                <div
                    className={`absolute font-extralight tracking-[0.2em] transition-all duration-700 ease-in-out ${
                        isMobile
                            ? 'left-[4%] top-[5%] text-2xl'
                            : 'left-[5%] top-[6%] text-5xl'
                    } text-white`}
                >
                    <p>Cheers Beaches</p>
                </div>

                <div
                    className={`z-50 pb-5 transition-all duration-700 ease-in-out ${
                        isMobile
                            ? 'bottom-[5%] right-[50%]'
                            : 'bottom-[10%] left-[50%] right-[50%]'
                    } flex space-x-2`}
                >
                    {images.map((_, index) => (
                        <div
                            className="py-2 hover:cursor-pointer"
                            onClick={() => setCurrentImage(index)}
                            key={index}
                        >
                            <div
                                className={`h-0.5 ${
                                    isMobile ? 'w-8' : 'w-10'
                                } rounded-full bg-white ${
                                    index === currentImage
                                        ? 'animate-pulse'
                                        : ''
                                }`}
                            ></div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="h-screen w-full bg-white"></div>
        </>
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
