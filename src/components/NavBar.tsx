import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const NavBar = () => {
    const { data: session } = useSession();
    const { pathname } = useRouter();

    return (
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
            <li>
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
            </li>
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
                        src="/tempPhotos/island.png"
                        alt="Island icon by icons8.com"
                        className="mr-1 mt-0.5"
                        width={24}
                        height={24}
                    />
                    {session ? "Sign out" : "Sign in"}
                </button>
            </li>
        </ul>
    );
};

export default NavBar;
