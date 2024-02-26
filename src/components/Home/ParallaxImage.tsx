import { useEffect, useRef, useState } from "react";
import { useScrollContext } from "~/context/ScrollContext";
import Image from "next/image";
import { useMobileContext } from "~/context/MobileContext";

type BackgroundImageProps = {
    src: string;
    alt: string;
    children: React.ReactNode;
};

export default function ParallaxImage({
    src,
    alt,
    children,
}: BackgroundImageProps) {
    const { scrollY } = useScrollContext();
    const { isMobile } = useMobileContext();
    const [offset, setOffset] = useState(0);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (ref.current) {
            const top = ref.current.getBoundingClientRect().top;

            if (top <= window.innerHeight) setOffset(window.innerHeight - top);
        }
    }, [offset, scrollY]);

    if (isMobile)
        return (
            <div
                ref={ref}
                className="relative flex h-screen w-full flex-col overflow-hidden bg-black bg-opacity-50"
            >
                <Image
                    src={src}
                    alt={alt}
                    fill
                    className="object-scale-down object-bottom"
                    style={{
                        transform: `translateY(-${offset * 0.15}px) scale(1.5)`,
                    }}
                />
                <Image
                    src={src}
                    alt={alt}
                    fill
                    className="-z-10 overflow-visible object-cover blur-sm"
                />
                <div className="h-4 w-full bg-black" />
                {children}
            </div>
        );
    else
        return (
            <div
                ref={ref}
                className="relative flex h-screen w-full flex-col overflow-hidden"
            >
                <Image
                    src={src}
                    alt={alt}
                    fill
                    className="-z-10 overflow-visible object-cover object-left-bottom"
                    style={{
                        transform: `translateY(${offset * 0.1}px) scale(1.1)`,
                    }}
                />
                <div className="h-4 w-full bg-black" />
                {children}
            </div>
        );
}
