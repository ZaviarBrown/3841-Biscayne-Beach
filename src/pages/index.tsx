import type { NextPage } from "next";
import ButtonBanner from "~/components/ButtonBanner";
import Carousel from "~/components/Carousel";
import TripleLink from "~/components/TripleLink";
import Welcome from "~/components/Welcome";

const Home: NextPage = () => {
    return (
        <>
            <Carousel />
            <TripleLink />
            <Welcome />
            <ButtonBanner />
        </>
    );
};

export default Home;
