import { useEffect, useRef, useState } from "react";
import { useScrollContext } from "~/context/ScrollContext";
import Image from "next/image";

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
    const [offset, setOffset] = useState(0);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (ref.current) {
            const top = ref.current.getBoundingClientRect().top;

            if (top <= window.innerHeight) setOffset(window.innerHeight - top);
        }
    }, [offset, scrollY]);

    return (
        <div
            ref={ref}
            className="relative flex h-screen w-full flex-col overflow-hidden"
        >
            <Image
                src={src}
                alt={alt}
                className="-z-10 overflow-visible object-cover object-left-top"
                fill
                style={{
                    transform: `translateY(-${offset * 0.2}px) scale(1.5)`,
                }}
            />
            <div className="h-3 w-full bg-black" />
            {children}
        </div>
    );
}
