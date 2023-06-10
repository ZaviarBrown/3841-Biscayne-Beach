import type { NextPage } from "next";
import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";
import { api } from "~/utils/api";

import Carousel from "./components/Carousel";

const Home: NextPage = () => {
    const homePageImages = [
        "1_front.jpg",
        "2_side.jpg",
        "3_kitchen.jpg",
        "4_roomAndBath.jpg",
        "5_beach.jpg",
        "6_sunset.jpg",
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

            <Carousel images={homePageImages} />
        </>
    );
};

export default Home;
