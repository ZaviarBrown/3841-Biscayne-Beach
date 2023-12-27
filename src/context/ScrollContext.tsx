import { createContext, useContext, useEffect, useState } from "react";

const ScrollContext = createContext({
    scrollY: 0,
    showCarousel: true,
    height: 0,
});

export function ScrollContextProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [height, setHeight] = useState(0);
    const [scrollY, setScrollY] = useState(0);
    const [showCarousel, setShowCarousel] = useState(true);

    useEffect(() => {
        // Had to set height as state b/c window DNE when using SSR
        setHeight(window.innerHeight);

        const handleScroll = () => {
            setScrollY(window.scrollY);

            if (window.scrollY > window.innerHeight) setShowCarousel(false);
            else setShowCarousel(true);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <ScrollContext.Provider value={{ scrollY, showCarousel, height }}>
            {children}
        </ScrollContext.Provider>
    );
}

export const useScrollContext = () => useContext(ScrollContext);
