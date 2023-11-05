import Image from "next/image";
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
        <div>
            <div className="">
                <Image
                    src={`/tempPhotos/${images[currentImage] ?? "1_front.jpg"}`}
                    fill
                    alt="Carousel Image"
                    className="object-cover"
                />
            </div>
            <div>
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
