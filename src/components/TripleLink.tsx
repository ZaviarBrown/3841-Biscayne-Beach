import Image from "next/image";
import Link from "next/link";
import { galleryImages as images } from "~/data";

export default function TripleLink() {
    return (
        <ul className="flex aspect-[4/1] max-w-full bg-white p-3">
            {images.map(({ src, alt }, i) =>
                i < 3 ? (
                    <li className="flex-1 p-2" key={src}>
                        <Link
                            href="/gallery"
                            className="flex h-full w-full flex-col"
                        >
                            <div className="relative w-full flex-1">
                                <Image
                                    src={src}
                                    alt={alt}
                                    className="object-cover"
                                    fill
                                />
                            </div>
                            <div className="p-2">
                                <p className="text-3xl font-bold">
                                    Larger Text
                                </p>
                                <p className="text-lg">Smaller text</p>
                            </div>
                        </Link>
                    </li>
                ) : null
            )}
        </ul>
    );
}
