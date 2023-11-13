import Image from "next/image";

export default function Gallery() {
    const images = [
        "1_new-front.jpg",
        "2_new-side.jpg",
        "3_new-kitchen.jpg",
        "4_deck.jpg",
        "5_room.jpg",
        "6_bath.jpg",
        "7_high-view.jpg",
        "8_birds-eye.jpg",
        "9_sunset.jpg",
    ];
    return (
        <div className="flex flex-wrap justify-center gap-2">
            {images.map((url, index) => (
                <div key={url}>
                    <Image
                        src={`/tempPhotos/${url ?? "1_front.jpg"}`}
                        alt={`Image #${index + 1}`}
                        width={900}
                        height={900}
                    />
                </div>
            ))}
        </div>
    );
}
