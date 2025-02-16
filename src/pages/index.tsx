import type { NextPage } from "next";
import Carousel from "~/components/Carousel";
import TripleLink from "~/components/TripleLink";

const Home: NextPage = () => {
    return (
        <>
            <Carousel />
            <TripleLink />
        </>
    );
};

export default Home;
