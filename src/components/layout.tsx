import Head from "next/head";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { useRouter } from "next/router";

export default function Layout({ children }: { children: React.ReactNode }) {
    const { pathname } = useRouter();
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
            <div className="flex flex-col">
                <nav
                    className={`fixed z-10 w-full px-6 py-4 backdrop-blur ${
                        pathname === "/" ? "" : "bg-black/50"
                    }`}
                    aria-label="Main Navigation"
                >
                    <NavBar />
                </nav>
                <main
                    className={`flex w-full flex-col items-center justify-center ${
                        pathname === "/" ? "h-screen" : "pt-24"
                    }`}
                >
                    {children}
                </main>
                <Footer />
            </div>
        </>
    );
}
