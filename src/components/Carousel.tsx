/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";

const images = ["1_front.jpg", "3_kitchen.jpg", "5_beach.jpg", "6_sunset.jpg"];

const Carousel = () => {
    const [currentImage, setCurrentImage] = useState(0);

    const nextImage = () => {
        setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    };

    const previousImage = () => {
        setCurrentImage(
            (prevImage) => (prevImage - 1 + images.length) % images.length
        );
    };

    return (
        <div className="relative z-10 flex h-[80vh] items-center justify-center bg-black">
            <div className="absolute z-20 text-center text-[150px] font-thin italic text-white opacity-90">
                {
                    ["Vacation", "Luxury", "Adventure", "Perfection"][
                        currentImage
                    ]
                }
                <br></br>
                Awaits
            </div>
            <div className="h-[80vh] overflow-hidden opacity-70">
                <img
                    src={`/tempPhotos/${images[currentImage] ?? "1_front.jpg"}`}
                    alt="Carousel Image"
                    className="absolute inset-0 h-full w-full object-cover"
                    style={{ objectPosition: "center bottom 20%" }}
                />
            </div>

            <div className="absolute bottom-10 left-10 right-10 flex justify-between p-4">
                <button
                    onClick={previousImage}
                    className="h-14 w-14 rounded-lg border border-slate-300 bg-slate-900 px-4 py-2 text-white opacity-50 transition-all duration-200 hover:scale-110 hover:opacity-90"
                >
                    {"<"}
                </button>

                <button
                    onClick={nextImage}
                    className="h-14 w-14 rounded-lg border border-slate-300 bg-slate-900 px-4 py-2 text-white opacity-50 transition-all duration-200 hover:scale-110 hover:opacity-90"
                >
                    {">"}
                </button>
            </div>
        </div>
    );
};

export default Carousel;
