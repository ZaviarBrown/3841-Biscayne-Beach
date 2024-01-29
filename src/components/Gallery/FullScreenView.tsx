import Image from "next/image";
import { useState } from "react";
import type { StaticImagesType } from "~/pages";
import { useModalContext } from "~/context/ModalContext";

export default function FullScreenView({
    index,
    galleryImages,
}: {
    index: number;
    galleryImages: StaticImagesType[];
}) {
    const { closeModal } = useModalContext();
    const [currentImage, setCurrentImage] = useState(index);

    const nextImage = () => {
        setCurrentImage((prevImage) => (prevImage + 1) % galleryImages.length);
    };

    const previousImage = () => {
        setCurrentImage(
            (prevImage) =>
                (prevImage - 1 + galleryImages.length) % galleryImages.length
        );
    };

    console.log("uhhh hi");

    return (
        <div className="flex h-[94vh] w-[96vw] items-center justify-between rounded-2xl border-2 border-slate-200 backdrop-blur-lg">
            {galleryImages.map(({ src, alt }, index) => (
                <div
                    key={src}
                    className={`${
                        index === currentImage ? "opacity-100" : "opacity-0"
                    } fixed inset-0 m-auto h-[99%] w-[99%] transition-opacity duration-1000`}
                >
                    <Image
                        src={src}
                        alt={alt}
                        className="object-contain"
                        fill
                        sizes="99vw"
                    />
                </div>
            ))}

            <button
                onClick={closeModal}
                className="absolute left-2 top-2 rounded-md border border-slate-200 bg-black px-4 py-2 text-white opacity-70 duration-200 hover:opacity-100"
            >
                {"X"}
            </button>

            <button
                onClick={previousImage}
                className="mx-5 rounded-md border border-slate-200 bg-black px-4 py-2 text-white opacity-70 transition-opacity duration-200 hover:opacity-90"
            >
                {"<"}
            </button>

            <button
                onClick={nextImage}
                className="mx-5 rounded-md border border-slate-200 bg-black px-4 py-2 text-white opacity-70 transition-opacity duration-200 hover:opacity-90"
            >
                {">"}
            </button>
        </div>
    );
}
