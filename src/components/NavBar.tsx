import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useScrollContext } from "~/context/ScrollContext";

const NavBar = () => {
    const { scrollY, height, scrollDirection } = useScrollContext();
    const { data: session } = useSession();
    const { pathname } = useRouter();
    const [hideNav, setHideNav] = useState(false);

    useEffect(() => {
        if (scrollY <= height / 3) {
            setHideNav(false);
        } else setHideNav(scrollDirection === "down");
    }, [scrollY, height, scrollDirection]);

    return (
        <nav
            className={`fixed left-0 right-0 top-0 z-50 transform p-4 ${
                hideNav ? "-translate-y-full" : "translate-y-0"
            } bg-black bg-opacity-50 backdrop-blur transition-transform duration-700 `}
            aria-label="Main Navigation"
        >
            <ul className="flex items-center justify-between text-xl text-white">
                <li>
                    <Link
                        className="text-2xl font-semibold"
                        href="/"
                        aria-label="Home"
                    >
                        3841 Biscayne Beach
                    </Link>
                </li>
                <li>
                    <Link className="group relative" href="/gallery">
                        Gallery
                        <span
                            className={`absolute -bottom-0.5 left-0 h-0.5  bg-white ${
                                pathname === "/gallery"
                                    ? "w-full"
                                    : "w-0 transition-all duration-200 group-hover:w-full"
                            }`}
                        ></span>
                    </Link>
                </li>
                <li>
                    <Link className="group relative" href="/house-rules">
                        House Rules
                        <span
                            className={`absolute -bottom-0.5 left-0 h-0.5  bg-white ${
                                pathname === "/house-rules"
                                    ? "w-full"
                                    : "w-0 transition-all duration-200 group-hover:w-full"
                            }`}
                        ></span>
                    </Link>
                </li>
                <li>
                    <Link className="group relative" href="/book">
                        Book Now
                        <span
                            className={`absolute -bottom-0.5 left-0 h-0.5  bg-white ${
                                pathname === "/book"
                                    ? "w-full"
                                    : "w-0 transition-all duration-200 group-hover:w-full"
                            }`}
                        ></span>
                    </Link>
                </li>
                {/* <li>
                    <Link className="group relative" href="/reviews">
                        Reviews
                        <span
                            className={`absolute -bottom-0.5 left-0 h-0.5  bg-white ${
                                pathname === "/reviews"
                                    ? "w-full"
                                    : "w-0 transition-all duration-200 group-hover:w-full"
                            }`}
                        ></span>
                    </Link>
                </li> */}
                {session && (
                    <li>
                        <Link className="group relative" href="/your-bookings">
                            Your Bookings
                            <span
                                className={`absolute -bottom-0.5 left-0 h-0.5  bg-white ${
                                    pathname === "/your-bookings"
                                        ? "w-full"
                                        : "w-0 transition-all duration-200 group-hover:w-full"
                                }`}
                            ></span>
                        </Link>
                    </li>
                )}
                {session && session.user.role === "admin" && (
                    <li>
                        <Link className="group relative" href="/admin">
                            Admin
                            <span
                                className={`absolute -bottom-0.5 left-0 h-0.5  bg-white ${
                                    pathname === "/admin"
                                        ? "w-full"
                                        : "w-0 transition-all duration-200 group-hover:w-full"
                                }`}
                            ></span>
                        </Link>
                    </li>
                )}
                <li>
                    <button
                        onClick={() =>
                            session ? void signOut() : void signIn("google")
                        }
                        className="flex rounded-3xl border px-3 py-1 text-xl transition-all duration-200 hover:scale-105"
                    >
                        <Image
                            src="/assets/island.png"
                            alt="Island icon by icons8.com"
                            className="mr-1 mt-0.5"
                            width={24}
                            height={24}
                        />
                        {session ? "Sign out" : "Sign in"}
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;
