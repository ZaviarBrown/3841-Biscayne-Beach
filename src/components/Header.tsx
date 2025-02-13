import Image from "next/image";
import { galleryImages as images } from "~/data";
import type { StaticImagesType } from "~/data";

export default function Header({
    title,
    imageNum,
}: {
    title: string;
    imageNum: number;
}) {
    const { src, alt } = images[imageNum] as StaticImagesType;

    return (
        <>
            <div className="relative h-[33vh]">
                <div className="absolute h-full w-full">
                    <Image src={src} alt={alt} fill className="object-cover" />
                </div>
                <div className="absolute top-0 h-1/2 w-full bg-gradient-to-b from-black to-transparent opacity-50" />
                <div className="absolute bottom-0 h-1/2 w-full bg-gradient-to-b from-transparent to-black opacity-50" />
                <div className="absolute bottom-0 left-0 flex w-full items-center text-white">
                    <div className="h-px flex-1 border-b border-white opacity-70" />
                    <h1 className="px-5 py-3 text-5xl font-thin">{title}</h1>
                    <div className="h-px flex-1 border-b border-white opacity-70" />
                </div>
            </div>
        </>
    );
}
