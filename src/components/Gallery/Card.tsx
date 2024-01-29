import Image from "next/image";

export default function GalleryCard({
    src,
    alt,
    load,
}: {
    src: string;
    alt: string;
    load: boolean;
}) {
    return (
        <div className="relative h-80 w-full overflow-hidden rounded-lg border-2 border-slate-200 bg-slate-500 shadow-3xl duration-300 hover:-translate-y-1">
            <Image
                src={src}
                alt={alt}
                fill
                sizes="33vw"
                className={`object-cover ${
                    load ? "opacity-100" : "opacity-0"
                } transition-opacity duration-700`}
            />
        </div>
    );
}
