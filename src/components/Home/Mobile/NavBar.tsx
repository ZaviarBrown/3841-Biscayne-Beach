import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import NavBarSpacer from "../NavBarSpacer";

export default function MobileNavBar({
    hideNav,
    pathname,
    showMenu,
    setShowMenu,
}: {
    hideNav: boolean;
    pathname: string;
    showMenu: boolean;
    setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const { data: session } = useSession();

    return (
        <nav
            className={`fixed left-0 right-0 top-0 z-50 flex h-10 transform items-center justify-between gap-5  p-2 text-center text-lg text-white ${
                !showMenu && hideNav ? "-translate-y-full" : "translate-y-0"
            } transition-transform duration-700 `}
            aria-label="Main Navigation"
        >
            <Link
                className="z-50 min-w-fit text-lg font-semibold"
                href="/"
                aria-label="Home"
            >
                Biscayne Beach
            </Link>
            <div
                className={`absolute left-0 top-0 bg-black bg-opacity-50 backdrop-blur transition-all duration-700 ease-out ${
                    showMenu ? "h-screen" : "h-10"
                } w-full border-b border-white`}
            >
                <NavBarSpacer />
                <ul
                    className={`${
                        showMenu
                            ? "opacity-100 delay-75 duration-500"
                            : "pointer-events-none opacity-0 delay-0 duration-500 ease-out"
                    } flex flex-col items-center gap-8 text-left transition-all`}
                >
                    <li>
                        <Link
                            className={`p-1 ${
                                pathname === "/gallery"
                                    ? "outline outline-1 outline-white"
                                    : ""
                            }`}
                            href="/gallery"
                        >
                            Gallery
                        </Link>
                    </li>
                    <li>
                        <Link
                            className={`p-1 ${
                                pathname === "/house-rules"
                                    ? "outline outline-1 outline-white"
                                    : ""
                            }`}
                            href="/house-rules"
                        >
                            House Rules
                        </Link>
                    </li>
                    <li>
                        <Link
                            className={`p-1 ${
                                pathname === "/book"
                                    ? "outline outline-1 outline-white"
                                    : ""
                            }`}
                            href="/book"
                        >
                            Book Now
                        </Link>
                    </li>
                    {session && (
                        <li>
                            <Link
                                className={`p-1 ${
                                    pathname === "/your-bookings"
                                        ? "outline outline-1 outline-white"
                                        : ""
                                }`}
                                href="/your-bookings"
                            >
                                Your Bookings
                            </Link>
                        </li>
                    )}
                    {session && session.user.role === "admin" && (
                        <li>
                            <Link
                                className={`p-1 ${
                                    pathname === "/admin"
                                        ? "outline outline-1 outline-white"
                                        : ""
                                }`}
                                href="/admin"
                            >
                                Admin
                            </Link>
                        </li>
                    )}
                    <li>
                        <button
                            onClick={() =>
                                session ? void signOut() : void signIn("google")
                            }
                            className="flex h-10 min-w-fit items-center justify-between rounded-3xl border px-3 py-1 text-xl transition-all duration-200 hover:scale-105"
                        >
                            {session ? "Sign out" : "Sign in"}
                        </button>
                    </li>
                </ul>
            </div>
            <button
                onClick={() => setShowMenu((prev) => !prev)}
                className="z-50 flex h-6 min-w-fit items-center justify-between rounded-full border px-2 py-[14px] text-base transition-all duration-200 hover:scale-105"
            >
                <Image
                    src="/assets/island.png"
                    alt="Island icon by icons8.com"
                    width={22}
                    height={22}
                />
            </button>
        </nav>
    );
}
