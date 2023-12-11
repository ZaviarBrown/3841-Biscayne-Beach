import React from "react";
import { env } from "~/env.mjs";

export default function GoogleMapsEmbed() {
    const src = `https://www.google.com/maps/embed/v1/place?key=${
        env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
    }&q=${encodeURIComponent("3841 Biscayne Beach Rd Port Bolivar, TX")}`;

    return (
        <div
            className="map-container"
            style={{ width: "100%", height: "400px" }}
        >
            <iframe
                title="Google Map"
                src={src}
                width="100%"
                height="100%"
                allowFullScreen
                loading="lazy"
            ></iframe>
        </div>
    );
}
