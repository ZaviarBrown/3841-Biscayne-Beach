import type { NextPage } from "next";

import Carousel from "../components/Carousel";
import HomeDetails from "../components/HomeDetails";
import GoogleMapsEmbed from "~/components/GoogleMapsEmbed";
import HomeHook from "~/components/HomeHook";
import HomeAmenities from "~/components/HomeAmenities";

const Home: NextPage = () => {
    return (
        <>
            <Carousel />
            <HomeHook />
            <HomeDetails />
            <HomeAmenities />
            <GoogleMapsEmbed />
        </>
    );
};

export default Home;
