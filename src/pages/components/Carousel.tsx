/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";

interface CarouselProps {
    images: string[];
}

const Carousel = ({ images }: CarouselProps) => {
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
        <div className="relative h-[80vh] bg-black">
            <div className="h-[80vh] overflow-hidden opacity-70">
                <img
                    src={`/tempPhotos/${images[currentImage] ?? "1_front.jpg"}`}
                    alt="Carousel Image"
                    className=""
                />
            </div>

            <div className="absolute bottom-0 left-0 right-0 flex justify-between p-4">
                <button
                    onClick={previousImage}
                    className="rounded-lg border border-slate-300 
                    bg-slate-900 px-4 py-2 text-white opacity-70 
                    transition-all duration-200 hover:scale-110 hover:opacity-90"
                >
                    {"<"}
                </button>

                <button
                    onClick={nextImage}
                    className=" rounded-lg border border-slate-300 
                    bg-slate-900 px-4 py-2 text-white opacity-70 
                    transition-all duration-200 hover:scale-110 hover:opacity-90"
                >
                    {">"}
                </button>
            </div>
        </div>
    );
};

export default Carousel;
