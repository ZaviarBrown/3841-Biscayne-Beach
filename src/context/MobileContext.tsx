import { createContext, useContext, useEffect, useState } from "react";

const MobileContext = createContext({ isMobile: true });

export function MobileContextProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const resize = () => setIsMobile(window.innerWidth <= 800);
        resize();

        window.addEventListener("resize", resize);
        return () => window.removeEventListener("resize", resize);
    }, []);

    return (
        <MobileContext.Provider value={{ isMobile }}>
            {children}
        </MobileContext.Provider>
    );
}

export const useMobileContext = () => useContext(MobileContext);
