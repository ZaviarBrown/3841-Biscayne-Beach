/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useState } from "react";

type ImageRowProps = {
    image: string;
    description: string;
    order: number;
};

function ImageRow({ image, description, order }: ImageRowProps) {
    const ref = useRef<HTMLDivElement | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const currRef = ref.current;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry) setIsVisible(entry.isIntersecting);
            },
            {
                root: null,
                rootMargin: "0px",
                threshold: 0.1,
            }
        );

        if (currRef) {
            observer.observe(currRef);
        }

        return () => {
            if (currRef) {
                observer.unobserve(currRef);
            }
        };
    }, []);

    const leftOrRight = order % 2 === 0 ? "" : "flex-row-reverse";

    return (
        <div
            ref={ref}
            className={`mb-4 flex items-center justify-between transition-all duration-1000 ${
                isVisible
                    ? "transform-gpu opacity-100"
                    : "-translate-x-32 transform-gpu opacity-0"
            } ${leftOrRight} mx-4`}
        >
            <img
                className={`mr-4 w-2/5 transition-all duration-1000 ${
                    isVisible
                        ? "transform-gpu opacity-100"
                        : "-translate-x-32 transform-gpu opacity-0"
                }`}
                src={image}
                alt={description}
            />
            <div
                className={`ml-4 w-3/5 transition-all duration-1000 ${
                    isVisible
                        ? "transform-gpu opacity-100"
                        : "translate-x-32 transform-gpu opacity-0"
                } h-auto max-h-[60%] overflow-auto`}
            >
                {description}
            </div>
        </div>
    );
}

export default ImageRow;
