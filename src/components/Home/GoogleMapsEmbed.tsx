import Image from "next/image";
import React from "react";
import { useMobileContext } from "~/context/MobileContext";
import { env } from "~/env.mjs";

export default function GoogleMapsEmbed() {
    const { isMobile } = useMobileContext();

    const src = `https://www.google.com/maps/embed/v1/place?key=${
        env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
    }&q=${encodeURIComponent("3841 Biscayne Beach Rd Port Bolivar, TX")}`;

    // if (isMobile)
    return (
        <>
            <div className="relative flex min-h-screen flex-col border-t border-white">
                <Image
                    className="-z-10 overflow-visible object-cover blur-sm"
                    fill
                    src="/images/aerial-view.jpg"
                    alt="Birds-eye view"
                />

                <div
                    className={`flex h-fit flex-col items-center justify-center gap-2 border-b border-white bg-black bg-opacity-80 p-5 text-center text-white backdrop-blur-sm`}
                >
                    <div
                        className={`m-auto break-words ${
                            isMobile ? "text-lg" : "max-w-[70vw] text-2xl"
                        }`}
                    >
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
                                className="text-blue-500 hover:underline"
                                href="https://www.bolivarpeninsulatexas.com"
                            >
                                bolivarpeninsulatexas.com
                            </a>
                        </p>
                    </div>

                    <div
                        className={`m-auto w-full break-words ${
                            isMobile ? "text-base" : "text-xl"
                        }`}
                    >
                        <h2
                            className={`pb-5 ${
                                isMobile ? "text-xl" : "text-3xl"
                            }`}
                        >
                            {"Here's some of our nearby favorites"}
                        </h2>
                        <div className="grid w-full grid-flow-row grid-cols-2 justify-items-center gap-2">
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
                <div className="h-screen w-full p-5">
                    <iframe
                        title="Google Map"
                        src={src}
                        width="100%"
                        height="100%"
                        allowFullScreen
                        loading="lazy"
                        className="m-auto rounded-2xl border bg-white p-3"
                    />
                </div>
            </div>
        </>
    );
}
