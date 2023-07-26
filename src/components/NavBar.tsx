import { signIn, signOut, useSession } from "next-auth/react";

/* eslint-disable @next/next/no-img-element */
const Navbar = () => {
    const { data: session } = useSession();

    return (
        <nav
            className="fixed left-0 right-0 top-0 z-20 flex items-center 
            justify-between bg-black/50 px-6 py-4 backdrop-blur"
        >
            <div className="text-2xl font-semibold text-white">
                3841 Biscayne Beach
            </div>
            <p className="text-center text-2xl text-white">
                {session && <span>Hello {session.user?.name}!</span>}
            </p>

            <button
                onClick={() => (session ? void signOut() : void signIn())}
                className="flex rounded-3xl border px-3 py-1 text-xl 
                    text-white transition-all duration-200 hover:scale-105"
            >
                <img
                    src="/tempPhotos/island.png"
                    alt="Island icon by icons8.com"
                    className="mr-1 mt-0.5 h-6"
                />
                {session ? "Sign out" : "Sign in"}
            </button>
        </nav>
    );
};

export default Navbar;
