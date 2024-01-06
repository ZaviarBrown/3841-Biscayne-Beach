import Link from "next/link";
import { useRouter } from "next/router";

const Footer = () => {
    const { pathname } = useRouter();

    return (
        <>
            <ul className="z-10 flex h-16 items-center justify-evenly border-t border-white bg-slate-700 text-white">
                <li>
                    <p>
                        <a
                            target="_blank"
                            href="https://icons8.com/icon/VhqD3P4a8KMP/island-on-water"
                        >
                            Island
                        </a>{" "}
                        icon by{" "}
                        <a target="_blank" href="https://icons8.com">
                            Icons8
                        </a>
                    </p>
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
