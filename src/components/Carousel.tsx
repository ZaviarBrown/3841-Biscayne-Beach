import Image from "next/image";
import { useState, useEffect } from "react";
import { useScrollContext } from "~/context/ScrollContext";

const images = [
    "2_new-side.jpg",
    "3_new-kitchen.jpg",
    "4_deck.jpg",
    "5_room.jpg",
    "6_bath.jpg",
    "9_sunset.jpg",
];

const Carousel = () => {
    const { showCarousel } = useScrollContext();
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
        <div className="flex h-screen w-full items-center justify-between bg-black bg-opacity-40">
            {images.map((url, index) => (
                <div
                    key={url}
                    className={`${showCarousel ? "" : "hidden"} ${
                        index === currentImage ? "opacity-100" : "opacity-0"
                    } fixed -z-10 h-screen w-full transition-opacity duration-1000`}
                >
                    <Image
                        src={`/allPhotos/${url ?? "2_new-side.jpg"}`}
                        alt={`Image #${index + 1}`}
                        className="object-cover"
                        fill
                    />
                </div>
            ))}

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

            <div className="absolute bottom-[10%] left-[10%] text-5xl text-white">
                <p>3841 Biscayne Beach Rd</p>
                <p>Port Bolivar, TX</p>
            </div>

            <div className="absolute bottom-[10%] right-[10%] flex space-x-2">
                {images.map((_, index) => (
                    <div
                        className="py-2 hover:cursor-pointer"
                        onClick={() => setCurrentImage(index)}
                        key={index}
                    >
                        <div
                            className={`h-0.5 w-10 rounded-full bg-white ${
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
