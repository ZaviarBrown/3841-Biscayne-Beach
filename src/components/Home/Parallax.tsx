import { useMobileContext } from '~/context/MobileContext';
import type { HomeDetailsType } from '~/data';

type BackgroundImageProps = {
    src: string;
    alt: string;
    children: React.ReactNode;
};

export const ParallaxImage = ({ src, alt, children }: BackgroundImageProps) => {
    const bandAid = src === '/images/house-sunset.jpg';

    return (
        <div
            className={`relative flex h-screen flex-col bg-cover bg-fixed ${
                bandAid ? 'bg-bottom' : 'bg-center'
            }`}
            aria-label={alt}
            style={{
                backgroundImage: `url(${src})`,
            }}
        >
            {children}
        </div>
    );
};

export const ParallaxDetailScene = ({ alt, src, textArr }: HomeDetailsType) => {
    const { isMobile } = useMobileContext();

    return (
        <>
            <ParallaxImage src={src} alt={alt}>
                <div
                    className={`flex flex-col items-center justify-center border-y border-white bg-black bg-opacity-80 p-2 text-center text-white shadow-4xl backdrop-blur-sm`}
                >
                    {textArr.map((text, i) => {
                        return (
                            <p
                                key={i}
                                className={`break-words p-2 ${
                                    isMobile
                                        ? 'text-lg'
                                        : 'max-w-[70vw] text-2xl'
                                }`}
                            >
                                {text}
                            </p>
                        );
                    })}
                </div>
            </ParallaxImage>
        </>
    );
};