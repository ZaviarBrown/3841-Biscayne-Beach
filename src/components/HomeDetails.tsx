import ParallaxImage from "./ParallaxImage";

export default function HomeDetails() {
    return (
        <>
            <ParallaxImage
                src="/landingPhotos/exterior_overhead.jpg"
                alt="New Kitchen"
            >
                <div className="flex h-full w-full">
                    <div className="flex w-2/3 flex-col items-center justify-center gap-3 bg-black bg-opacity-70 text-center text-white">
                        <h1 className="w-1/2 text-6xl">
                            Fits your family, and then some
                        </h1>
                        <p className="w-1/2 text-2xl">5 Bedrooms</p>
                        <p className="w-1/2 text-2xl">4 Bathrooms</p>
                        <p className="w-1/2 text-2xl">
                            Sleeps 16 adults + 4 kids
                        </p>
                    </div>
                    <div className="w-1/3" />
                </div>
            </ParallaxImage>
        </>
    );
}
