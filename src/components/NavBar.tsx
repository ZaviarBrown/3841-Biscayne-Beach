import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
    const { data: session } = useSession();

    return (
        <nav
            className="fixed left-0 right-0 top-0 z-20 bg-black/50 px-6 py-4 backdrop-blur"
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
                    <Link className="group relative" href="/book">
                        Book Now
                        <span className="absolute -bottom-0.5 left-0 h-0.5 w-0 bg-white transition-all duration-200 group-hover:w-full"></span>
                    </Link>
                </li>
                <li>
                    <Link className="group relative" href="/reviews">
                        Reviews
                        <span className="absolute -bottom-0.5 left-0 h-0.5 w-0 bg-white transition-all duration-200 group-hover:w-full"></span>
                    </Link>
                </li>
                <li>
                    <Link className="group relative" href="/your-bookings">
                        Your Bookings
                        <span className="absolute -bottom-0.5 left-0 h-0.5 w-0 bg-white transition-all duration-200 group-hover:w-full"></span>
                    </Link>
                </li>
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
        </nav>
    );
};

export default Navbar;
