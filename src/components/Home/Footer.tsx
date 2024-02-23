import Link from "next/link";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Footer = () => {
    const { pathname } = useRouter();
    const [hideFooter, setHideFooter] = useState(false);

    useEffect(() => {
        if (pathname.startsWith("/confirm-and-pay")) {
            setHideFooter(true);
        }

        return () => setHideFooter(false);
    }, [pathname]);

    if (hideFooter) return null;

    return (
        <>
            <ul className="relative z-10 flex h-16 items-center justify-center gap-10 border-t border-white bg-slate-700 px-5 text-white">
                {/* <li className="absolute bottom-2 left-2 text-xs text-slate-300">
                    <Link className="group relative" href="/legal/attributions">
                        Attributions
                        <span
                            className={`absolute -bottom-0.5 left-0 h-0.5  bg-white ${
                                pathname === "/legal/attributions"
                                    ? "w-full"
                                    : "w-0 transition-all duration-200 group-hover:w-full"
                            }`}
                        ></span>
                    </Link>
                </li> */}
                <li>
                    <Link className="group relative" href="/contact">
                        Contact Us
                        <span
                            className={`absolute -bottom-0.5 left-0 h-0.5  bg-white ${
                                pathname === "/contact"
                                    ? "w-full"
                                    : "w-0 transition-all duration-200 group-hover:w-full"
                            }`}
                        ></span>
                    </Link>
                </li>
                <li>
                    <Link
                        className="group relative"
                        href="/legal/terms-of-service"
                    >
                        Terms of Service
                        <span
                            className={`absolute -bottom-0.5 left-0 h-0.5  bg-white ${
                                pathname === "/legal/terms-of-service"
                                    ? "w-full"
                                    : "w-0 transition-all duration-200 group-hover:w-full"
                            }`}
                        ></span>
                    </Link>
                </li>
                <li>
                    <Link
                        className="group relative"
                        href="/legal/privacy-policy"
                    >
                        Privacy Policy
                        <span
                            className={`absolute -bottom-0.5 left-0 h-0.5  bg-white ${
                                pathname === "/legal/privacy-policy"
                                    ? "w-full"
                                    : "w-0 transition-all duration-200 group-hover:w-full"
                            }`}
                        ></span>
                    </Link>
                </li>
            </ul>
        </>
    );
};

export default Footer;
