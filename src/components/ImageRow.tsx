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
                threshold: 0.3,
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
    const leftTranslate = isVisible
        ? "transform-gpu opacity-100"
        : "-translate-x-32 transform-gpu opacity-0";
    const rightTranslate = isVisible
        ? "transform-gpu opacity-100"
        : "translate-x-32 transform-gpu opacity-0";

    return (
        <div
            ref={ref}
            className={`mb-32 flex items-center justify-between transition-all duration-1000 ${leftOrRight} mx-4`}
        >
            <img
                className={`mx-4 w-1/2 transition-all duration-1000 ${
                    leftOrRight === ""
                        ? leftTranslate + " shadow-4xlL"
                        : rightTranslate + " shadow-4xlR"
                }`}
                src={image}
                alt={description}
            />
            <div
                className={`mx-4 transition-all duration-1000 ${
                    leftOrRight === "" ? rightTranslate : leftTranslate
                } h-auto max-h-[60%] overflow-auto`}
            >
                {description}
            </div>
        </div>
    );
}

export default ImageRow;
