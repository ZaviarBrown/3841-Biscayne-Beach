import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useScrollContext } from "~/context/ScrollContext";
import { useMobileContext } from "~/context/MobileContext";

const NavBar = () => {
    const { isMobile } = useMobileContext();
    const { scrollY, height, scrollDirection } = useScrollContext();
    const { pathname } = useRouter();
    const [hideNav, setHideNav] = useState(false);
    const [showMenu, setShowMenu] = useState(false);

    useEffect(() => {
        if (pathname === "/" || pathname === "/gallery") {
            if (scrollY <= height / 3) {
                setHideNav(false);
            } else setHideNav(scrollDirection === "down");
        }

        if (pathname.startsWith("/confirm-and-pay")) {
            setHideNav(true);
        }

        setShowMenu(false);

        return () => setHideNav(false);
    }, [scrollY, height, scrollDirection, pathname]);

    if (isMobile) return null;
    else
        return (
            <nav
                className={`absolute left-0 right-0 top-0 z-50 flex transform items-center justify-between overflow-hidden border-b border-white border-opacity-80 p-2 text-center text-white`}
                aria-label="Main Navigation"
            >
                <div className="mx-2 font-extralight">
                    <span className="border-r border-opacity-70 p-3">
                        3841 Biscayne Beach Rd
                    </span>
                    <span className="p-3">Port Bolivar, TX</span>
                </div>
                <div className="mx-2 font-extralight">
                    <span className="border-r border-opacity-70 px-2">
                        Gallery
                    </span>
                    <span className="border-r border-opacity-70 px-2">
                        House Rules
                    </span>
                    <span className="border-r border-opacity-70 px-2">
                        Location
                    </span>
                    <span className="border-r border-opacity-70 px-2">
                        Book
                    </span>
                    <span className="border-r border-opacity-70 px-2">
                        Contact
                    </span>
                    <span className="border-opacity-70 px-2">Sign In</span>
                </div>
            </nav>
        );
};

export default NavBar;
