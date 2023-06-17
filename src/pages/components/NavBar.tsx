/* eslint-disable @next/next/no-img-element */
const Navbar = () => {
    return (
        <nav
            className="fixed left-0 right-0 top-0 z-20 flex items-center 
            justify-between px-6 py-4"
        >
            <div className="text-2xl font-semibold text-white">
                3841 Biscayne Beach
            </div>
            <ul className="flex space-x-4">
                <li
                    className="flex rounded-3xl border px-3 py-1 transition-all 
                    duration-200 hover:scale-105"
                >
                    <img
                        src="/tempPhotos/island.png"
                        alt="Island icon by icons8.com"
                        className="mr-1 mt-0.5 h-6"
                    />
                    <a href="#" className="text-xl text-white">
                        Sign In
                    </a>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
