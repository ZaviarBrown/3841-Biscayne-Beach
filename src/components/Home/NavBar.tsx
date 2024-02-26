import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useScrollContext } from "~/context/ScrollContext";
import DesktopNavBar from "./Desktop/NavBar";
import { useMobileContext } from "~/context/MobileContext";
import MobileNavBar from "./Mobile/NavBar";

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

    if (isMobile)
        return (
            <MobileNavBar
                hideNav={hideNav}
                pathname={pathname}
                showMenu={showMenu}
                setShowMenu={setShowMenu}
            />
        );
    else return <DesktopNavBar hideNav={hideNav} pathname={pathname} />;
};

export default NavBar;
