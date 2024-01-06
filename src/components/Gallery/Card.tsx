import Image from "next/image";

export default function GalleryCard({
    url,
    i,
    load,
}: {
    url: string;
    i: number;
    load: boolean;
}) {
    return (
        <div className="relative h-80 w-full overflow-hidden rounded-lg border-2 border-slate-200 bg-slate-500 shadow-3xl duration-300 hover:-translate-y-1">
            <Image
                src={`/allPhotos/${url}`}
                alt={`Artwork ${i + 1}`}
                fill
                className={`object-cover ${
                    load ? "opacity-100" : "opacity-0"
                } transition-opacity duration-700`}
            />
        </div>
    );
}
