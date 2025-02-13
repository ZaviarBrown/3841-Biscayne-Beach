import type { NextPage } from "next";
import Carousel from "~/components/Home/Carousel";
import HomeDetails from "~/components/Home/HomeDetails";
import GoogleMapsEmbed from "~/components/Home/GoogleMapsEmbed";

const Home: NextPage = () => {
    return (
        <>
            <Carousel />
            <HomeDetails />
            <GoogleMapsEmbed />
        </>
    );
};

export default Home;
