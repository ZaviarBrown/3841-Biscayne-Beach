import Image from "next/image";
import React from "react";
import { env } from "~/env.mjs";

export default function GoogleMapsEmbed() {
    const src = `https://www.google.com/maps/embed/v1/place?key=${
        env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
    }&q=${encodeURIComponent("3841 Biscayne Beach Rd Port Bolivar, TX")}`;

    return (
        <>
            <div className="h-3 w-full bg-black" />
            <div className="flex h-screen w-full items-center justify-between bg-black bg-opacity-20">
                <div className="absolute -z-10 h-screen w-full bg-black">
                    <Image
                        className="object-cover"
                        fill
                        src="/allPhotos/8_birds-eye.jpg"
                        alt="Birds-eye view"
                    />
                </div>
                <div className="flex h-full w-1/3 flex-col items-center justify-center gap-3 bg-black bg-opacity-70 text-center text-white backdrop-blur-sm">
                    <h2 className="text-6xl text-white">Nearby favorites</h2>
                    <p className="text-2xl">Bolivar Ferry</p>
                    <p className="text-2xl">Fishing Charters</p>
                    <p className="text-2xl">Bolivar Lighthouse</p>
                    <p className="text-2xl">{"Houghton’s Hot Spot"}</p>
                    <p className="text-2xl">{"“Jose’s”"}</p>
                    <p className="text-2xl">“Hard Heads”</p>
                    <p className="text-2xl">Margaritaville</p>
                    <p className="text-2xl">Stingaree</p>
                    <p className="text-2xl">{"Nauti’s Beaver Hut"}</p>
                    <p className="text-2xl">{"Tia Juanita’s"}</p>
                    <p className="text-2xl">Latitude 29.2 Surf Shop</p>
                </div>
                <div className="mx-10 h-4/5 w-2/3 rounded-2xl  bg-white p-3">
                    <iframe
                        title="Google Map"
                        src={src}
                        width="100%"
                        height="100%"
                        allowFullScreen
                        loading="lazy"
                        className="rounded-lg border"
                    />
                </div>
            </div>
        </>
    );
}
