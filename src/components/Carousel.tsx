import Image from "next/image";
import { useState, useEffect } from "react";
import { useMobileContext } from "~/context/MobileContext";
import { useScrollContext } from "~/context/ScrollContext";
import { carouselImages as images } from "~/data";
import DarkFilter from "./DarkFilter";

const Carousel = () => {
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
        <div className="flex h-screen flex-col items-center justify-between">
            <h1 className="absolute left-[3%] top-[7%] text-5xl font-thin tracking-[0.25em] text-white transition-all duration-700 ease-in-out">
                Cheers Beaches
            </h1>

            <DarkFilter />

            {images.map(({ src, alt }, index) => (
                <div
                    key={src}
                    className={`${
                        index === currentImage ? "opacity-100" : "opacity-0"
                    } fixed -z-50 h-screen w-full max-w-full transition-opacity duration-1000`}
                >
                    <Image src={src} alt={alt} className="object-cover" fill />
                </div>
            ))}

            {/* Spacer */}
            <div />
            {/* Spacer */}

            <div className="flex w-full justify-between">
                <button
                    onClick={previousImage}
                    className="mx-5 rounded-md bg-black px-4 py-2 text-white opacity-50 duration-200 hover:opacity-90"
                >
                    {"<"}
                </button>

                <button
                    onClick={nextImage}
                    className="mx-5 rounded-md bg-black px-4 py-2 text-white opacity-50 duration-200 hover:opacity-90"
                >
                    {">"}
                </button>
            </div>
            <div className="flex space-x-2 pb-5">
                {images.map((_, index) => (
                    <div
                        className="py-2 hover:cursor-pointer"
                        onClick={() => setCurrentImage(index)}
                        key={index}
                    >
                        <div
                            className={`h-0.5 ${
                                isMobile ? "w-8" : "w-10"
                            } rounded-full bg-white ${
                                index === currentImage ? "animate-pulse" : ""
                            }`}
                        ></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Carousel;
