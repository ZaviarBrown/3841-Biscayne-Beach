import type { NextPage } from "next";

import Carousel from "../components/Carousel";
import HomeDetails from "../components/HomeDetails";

const Home: NextPage = () => {
    return (
        <>
            <Carousel />
            <HomeDetails />
        </>
    );
};

export default Home;
