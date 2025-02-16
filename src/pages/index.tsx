import type { NextPage } from "next";
import Carousel from "~/components/Home/Carousel";
import TripleLink from "~/components/Home/TripleLink";

const Home: NextPage = () => {
    return (
        <>
            <Carousel />
            <TripleLink />
        </>
    );
};

export default Home;
