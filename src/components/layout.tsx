import Head from "next/head";
import NavBar from "./NavBar";

import { Roboto_Slab } from "next/font/google";

const roboto = Roboto_Slab({
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    subsets: ["latin"],
});

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Head>
                <title>Cheers Beaches</title>
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
            <div className="flex min-h-screen max-w-full flex-col">
                <NavBar />
                <main className={`flex flex-grow flex-col ${roboto.className}`}>
                    {children}
                </main>
            </div>
        </>
    );
}
