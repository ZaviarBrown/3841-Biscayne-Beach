import Head from "next/head";
import NavBar from "./Home/NavBar";
import Footer from "./Home/Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
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
            <div className="flex min-h-screen flex-col">
                <NavBar />
                <main className="flex min-h-screen flex-grow flex-col">
                    {children}
                </main>
                <Footer />
            </div>
        </>
    );
}
