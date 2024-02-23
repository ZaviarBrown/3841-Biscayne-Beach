import ParallaxImage from "./ParallaxImage";

export default function HomeAmenities() {
    return (
        <>
            <ParallaxImage src="/landingPhotos/kitchen.jpg" alt="New Kitchen">
                <div className="flex h-full w-full">
                    <div className="w-1/3" />
                    <div className="flex w-2/3 flex-col items-center justify-center gap-3 bg-black bg-opacity-70 text-center text-white">
                        <h1 className="w-1/2 text-6xl">
                            Equipped for your convenience
                        </h1>
                        <p className="w-1/2 text-2xl">Full Kitchen</p>
                        <p className="w-1/2 text-2xl">Washer / Dryer</p>
                        <p className="w-1/2 text-2xl">Towels & Bed Linens</p>
                        <p className="w-1/2 text-2xl">WiFi + Smart TV</p>
                        <p className="w-1/2 text-2xl">Backup Generator</p>
                        <p className="w-1/2 text-2xl">
                            Outdoor shower w/ hot water
                        </p>
                    </div>
                </div>
            </ParallaxImage>
        </>
    );
}
