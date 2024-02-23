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
            <div className="flex h-screen min-h-screen w-full flex-grow items-center justify-between bg-black bg-opacity-20">
                <div className="absolute -z-10 h-screen w-full bg-black">
                    <Image
                        className="object-cover"
                        fill
                        src="/images/aerial-view.jpg"
                        alt="Birds-eye view"
                    />
                </div>
                <div className="flex h-full w-1/3 flex-col gap-5 overflow-y-auto overflow-x-hidden border-r border-white bg-black bg-opacity-70 p-3 text-center text-white backdrop-blur-sm">
                    <div className="m-auto w-full break-words text-2xl">
                        <p className="p-3">
                            The Bolivar Peninsula is located across the ferry
                            from Galveston. When you come across the bay to the
                            peninsula via ferry boat, the landscape changes from
                            urban port to small beach town charm.
                        </p>
                        <p className="p-3">
                            There are local amenities and restaurants and a few
                            well stocked stores. For local events, activities,
                            and all kinds of information, visit{" "}
                            <a
                                className="underline hover:text-cyan-400"
                                href="https://www.bolivarpeninsulatexas.com"
                            >
                                bolivarpeninsulatexas.com
                            </a>
                        </p>
                    </div>

                    <div className="m-auto w-full break-words text-xl">
                        <h2 className="pb-5 text-3xl">
                            {"Here's some of our nearby favorites"}
                        </h2>
                        <div className="grid w-full grid-flow-row grid-cols-2 justify-items-center gap-2 text-xl">
                            <p>Bolivar Ferry</p>
                            <p>Fishing Charters</p>
                            <p>Bolivar Lighthouse</p>
                            <p>{"Houghton's Hot Spot"}</p>
                            <p>Hard Heads</p>
                            <p>Margaritaville</p>
                            <p>Stingaree</p>
                            <p>{"Nauti's Beaver Hut"}</p>
                            <p>{"Tia Juanita's"}</p>
                            <p>Latitude 29.2 Surf Shop</p>
                        </div>
                    </div>
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
