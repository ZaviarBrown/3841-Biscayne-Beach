import { createContext, useContext, useEffect, useState } from "react";

const MobileContext = createContext({ isMobile: true, isIOS: true });

export function MobileContextProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isMobile, setIsMobile] = useState(false);
    const [isIOS, setIsIOS] = useState(false);

    useEffect(() => {
        // !!! Weird fix incoming !!!
        // Because Apple insists they know best, they don't allow the use of
        // 'bg-cover' & 'bg-fixed' with background images
        // This breaks the parallax effect ONLY ON APPLE DEVICES
        // So, this form of parallax must be disabled on those devices.
        // Also ONLY ON APPLE DEVICES is the 'window.navigator.standalone' prop
        // So if it's defined, I know to disable parallax
        // However, since that prop doesn't normally exist, TS throws an error
        // So I have to tell TS to ignore that error, which eslint is mad at
        // The result is the random BS below

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (window.navigator.standalone !== undefined) {
            setIsIOS(true);
        }
    }, []);

    useEffect(() => {
        const resize = () => setIsMobile(window.innerWidth <= 767);
        resize();

        window.addEventListener("resize", resize);
        return () => window.removeEventListener("resize", resize);
    }, []);

    return (
        <MobileContext.Provider value={{ isMobile, isIOS }}>
            {children}
        </MobileContext.Provider>
    );
}

export const useMobileContext = () => useContext(MobileContext);
