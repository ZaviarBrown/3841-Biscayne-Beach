import type { GetStaticProps } from "next";
import { useEffect, useState } from "react";
import GalleryCard from "~/components/Gallery/Card";
import LoadingCard from "~/components/Gallery/Loading";
import type { StaticImagesType } from "../";

export default function Gallery({
    galleryImages,
}: {
    galleryImages: StaticImagesType[];
}) {
    const [load, setLoad] = useState(0);

    useEffect(() => {
        if (load < galleryImages.length) {
            const fade = setTimeout(() => setLoad(load + 1), 100);

            return () => clearTimeout(fade);
        }
    }, [load, galleryImages.length]);

    return (
        <>
            <div className="pt-20" />
            {galleryImages.length !== 0 && (
                <>
                    <div className="grid grid-cols-1 gap-5 p-5 md:grid-cols-2 lg:grid-cols-3">
                        {galleryImages.map(({ src, alt }, i) => (
                            <GalleryCard
                                src={src}
                                alt={alt}
                                key={i}
                                load={load > i}
                            />
                        ))}
                    </div>
                    <iframe
                        className="h-screen w-3/4 self-center p-10"
                        src="/assets/FloorPlan.pdf"
                    />
                </>
            )}
            {galleryImages.length === 0 && (
                <div className="grid grid-cols-1 gap-5 p-5 md:grid-cols-2 lg:grid-cols-3">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((_, i) => (
                        <LoadingCard key={i} />
                    ))}
                </div>
            )}
        </>
    );
}

export const getStaticProps = (() => {
    const galleryImages = [
        {
            src: "/images/house.jpg",
            alt: "house",
        },
        {
            src: "/images/house-3.jpg",
            alt: "house-3",
        },
        {
            src: "/images/house-2.jpg",
            alt: "house-2",
        },
        {
            src: "/images/aerial-view.jpg",
            alt: "aerial-view",
        },
        {
            src: "/images/deck.jpg",
            alt: "deck",
        },
        {
            src: "/images/deck-2.jpg",
            alt: "deck-2",
        },
        {
            src: "/images/deck-3.jpg",
            alt: "deck-3",
        },
        {
            src: "/images/deck-4.jpg",
            alt: "deck-4",
        },
        {
            src: "/images/kitchen.jpg",
            alt: "kitchen",
        },
        {
            src: "/images/kitchen-2.jpg",
            alt: "kitchen-2",
        },
        {
            src: "/images/kitchen-3.jpg",
            alt: "kitchen-3",
        },
        {
            src: "/images/kitchen-4.jpg",
            alt: "kitchen-4",
        },
        {
            src: "/images/kitchen-5.jpg",
            alt: "kitchen-5",
        },
        {
            src: "/images/bathroom.jpg",
            alt: "bathroom",
        },
        {
            src: "/images/bedroom-5.jpg",
            alt: "bedroom-5",
        },
        {
            src: "/images/bedroom-6.jpg",
            alt: "bedroom-6",
        },
        {
            src: "/images/bedroom-7.jpg",
            alt: "bedroom-7",
        },
        {
            src: "/images/bedroom-8.jpg",
            alt: "bedroom-8",
        },
        {
            src: "/images/sunset.jpg",
            alt: "sunset",
        },
        {
            src: "/images/aerial-view-2.jpg",
            alt: "aerial-view-2",
        },
        {
            src: "/images/aerial-view-3.jpg",
            alt: "aerial-view-3",
        },
        {
            src: "/images/bedroom-2.jpg",
            alt: "bedroom-2",
        },
        {
            src: "/images/bedroom-3.jpg",
            alt: "bedroom-3",
        },
        {
            src: "/images/bedroom-4.jpg",
            alt: "bedroom-4",
        },
        {
            src: "/images/bedroom.jpg",
            alt: "bedroom",
        },
        {
            src: "/images/deck-sunset.jpg",
            alt: "deck-sunset",
        },
        {
            src: "/images/deck-sunset-2.jpg",
            alt: "deck-sunset-2",
        },
        {
            src: "/images/house-sunset.jpg",
            alt: "house-sunset",
        },
        {
            src: "/images/family-2.jpg",
            alt: "family-2",
        },
        {
            src: "/images/family.jpg",
            alt: "family",
        },
        {
            src: "/images/ocean.jpg",
            alt: "ocean",
        },
        {
            src: "/images/sunset-2.jpg",
            alt: "sunset-2",
        },
        {
            src: "/images/sunset-3.jpg",
            alt: "sunset-3",
        },
        {
            src: "/images/sunset-4.jpg",
            alt: "sunset-4",
        },
        {
            src: "/images/sunset-5.jpg",
            alt: "sunset-5",
        },
        {
            src: "/images/sunset-6.jpg",
            alt: "sunset-6",
        },
    ];
    return { props: { galleryImages } };
}) satisfies GetStaticProps<{
    galleryImages: StaticImagesType[];
}>;
