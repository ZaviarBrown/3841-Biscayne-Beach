import { useMobileContext } from '~/context/MobileContext';
import type { HomeDetailsType } from '~/data';

type BackgroundImageProps = {
    src: string;
    alt: string;
    children: React.ReactNode;
};

export const ParallaxImage = ({ src, alt, children }: BackgroundImageProps) => {
    return (
        <div
            className='relative flex h-screen flex-col bg-cover bg-fixed bg-center'
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
                    className={`flex flex-col items-center justify-center gap-2 border-y border-white bg-black bg-opacity-80 p-5 text-center text-white shadow-4xl backdrop-blur-sm`}
                >
                    {textArr.map((text, i) => {
                        return (
                            <p key={i} className={`break-words p-1 text-lg`}>
                                {text}
                            </p>
                        );
                    })}
                </div>
            </ParallaxImage>
        </>
    );
};
