import { useEffect, useState } from "react";
import GalleryCard from "~/components/Gallery/Card";
import LoadingCard from "~/components/Gallery/Loading";

export default function Gallery() {
    const [load, setLoad] = useState(0);

    const images = [
        "2_new-side.jpg",
        "3_new-kitchen.jpg",
        "4_deck.jpg",
        "5_room.jpg",
        "6_bath.jpg",
        "7_high-view.jpg",
        "8_birds-eye.jpg",
        "9_sunset.jpg",
    ];

    useEffect(() => {
        if (load < images.length) {
            const fade = setTimeout(() => setLoad(load + 1), 100);

            return () => clearTimeout(fade);
        }
    }, [load, images.length]);

    return (
        <>
            <div className="pt-20" />
            {images.length !== 0 && (
                <div className="grid grid-cols-1 gap-5 p-5 md:grid-cols-2 lg:grid-cols-3">
                    {images.map((url, i) => (
                        <GalleryCard url={url} i={i} key={i} load={load > i} />
                    ))}
                </div>
            )}
            {images.length === 0 && (
                <div className="grid grid-cols-1 gap-5 p-5 md:grid-cols-2 lg:grid-cols-3">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((_, i) => (
                        <LoadingCard key={i} />
                    ))}
                </div>
            )}
        </>
    );
}
