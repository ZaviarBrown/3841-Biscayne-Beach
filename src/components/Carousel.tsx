import Image from "next/image";
import { useState, useEffect } from "react";

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

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prevIndex) => (prevIndex + 1) % images.length);
        }, 4000);

        return () => clearInterval(interval);
    }, [currentImage]);

    return (
        <div className="relative flex h-full w-full items-center justify-between bg-black px-5">
            {images.map((url, index) => (
                <div
                    key={url}
                    className={`absolute inset-0 transition-opacity duration-1000 ${
                        index === currentImage ? "opacity-50" : "opacity-0"
                    }`}
                >
                    <Image
                        src={`/tempPhotos/${url ?? "1_front.jpg"}`}
                        alt={`Image #${index + 1}`}
                        className="object-cover"
                        fill
                    />
                </div>
            ))}

            <button
                onClick={previousImage}
                className="h-11 w-11 rounded-lg border border-slate-300 bg-slate-900 px-4 py-2 text-white opacity-50 transition-all duration-200 hover:scale-110 hover:opacity-90"
            >
                {"<"}
            </button>

            <button
                onClick={nextImage}
                className="h-11 w-11 rounded-lg border border-slate-300 bg-slate-900 px-4 py-2 text-white opacity-50 transition-all duration-200 hover:scale-110 hover:opacity-90"
            >
                {">"}
            </button>

            <div className="absolute bottom-[10%] left-[10%] text-5xl text-white">
                <p>3841 Biscayne Beach Rd</p>
                <p>Port Bolivar, TX</p>
            </div>

            <div className="absolute bottom-[10%] right-[10%] flex space-x-2">
                {images.map((_, index) => (
                    <div
                        key={index}
                        className={`h-0.5 w-10 rounded-full bg-white ${
                            index === currentImage ? "animate-pulse" : ""
                        }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Carousel;
