import type { NextPage } from "next";
import Head from "next/head";
import { api } from "~/utils/api";

import Carousel from "../components/Carousel";
import Navbar from "../components/NavBar";
import Booking from "../components/Booking";
import HomeDetails from "../components/HomeDetails";

const Home: NextPage = () => {
    const dummyData = [
        {
            image: "/tempPhotos/1_front.jpg",
            description:
                "Nestled along the pristine shores of the Gulf of Mexico, this exquisite Airbnb listing offers a truly unforgettable coastal experience. With its breathtaking views, luxurious amenities, and proximity to the beach, this home is the perfect retreat for your next vacation.",
        },
        {
            image: "/tempPhotos/3_kitchen.jpg",
            description:
                "The fully equipped gourmet kitchen is a culinary enthusiast's dream. Boasting modern appliances, ample counter space, and a large island with bar seating, it provides everything you need to whip up delicious meals. Whether you're hosting a family dinner or preparing a quick beachside picnic, this kitchen has you covered.",
        },
        {
            image: "/tempPhotos/4_roomAndBath.jpg",
            description:
                "The beachside home features multiple bedrooms, each thoughtfully designed to offer comfort and tranquility. The master suite is a true oasis, complete with a king-sized bed, a private balcony, and an en-suite bathroom featuring a deep soaking tub and a walk-in shower. Additional bedrooms offer cozy accommodations, ensuring a good night's rest for everyone.",
        },
        {
            image: "/tempPhotos/6_sunset.jpg",
            description:
                "Step outside onto the expansive deck, and you'll find the epitome of outdoor living. The deck is equipped with comfortable lounge chairs and a dining area, providing the perfect spot to savor your morning coffee or unwind with a cocktail while enjoying the breathtaking sunsets over the Gulf. A private walkway leads directly to the beach, allowing you to easily dip your toes in the sand or take a leisurely stroll along the shoreline.",
        },
    ];

    return (
        <>
            <Head>
                <title>Biscayne Beach</title>
                <meta
                    name="Biscayne Beach Rental"
                    content="Luxury beach-side home"
                />
                <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href="/favicon/apple-touch-icon.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                    href="/favicon/favicon-32x32.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="16x16"
                    href="/favicon/favicon-16x16.png"
                />
                <link rel="manifest" href="/favicon/site.webmanifest" />
            </Head>
            <Navbar />
            <Carousel />
            <div>
                <div className="absolute mt-10">
                    <div className="m-auto flex gap-16">
                        <div className="ml-32 mt-28">
                            <HomeDetails />
                        </div>
                        <div className="mr-32">
                            <Booking />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
