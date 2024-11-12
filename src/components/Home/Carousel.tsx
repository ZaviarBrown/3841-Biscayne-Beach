import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useMobileContext } from '~/context/MobileContext';
import { useScrollContext } from '~/context/ScrollContext';
import type { StaticImagesType } from '~/pages';

const Carousel = ({ images }: { images: StaticImagesType[] }) => {
    const { showCarousel } = useScrollContext();
    const { isMobile } = useMobileContext();
    const [currentImage, setCurrentImage] = useState(0);

    const nextImage = () => {
        setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    };

    const previousImage = () => {
        setCurrentImage(
            (prevImage) => (prevImage - 1 + images.length) % images.length
        );
    };

    useEffect(() => {
        if (!showCarousel) return;

        const interval = setInterval(() => {
            setCurrentImage((prevIndex) => (prevIndex + 1) % images.length);
        }, 4000);

        return () => clearInterval(interval);
    }, [currentImage, images.length, showCarousel]);

    // TODO: Image optimization

    return (
        <div className='flex h-screen w-full items-center justify-between bg-black bg-opacity-40'>
            {images.map(({ src, alt }, index) => (
                <div
                    key={src}
                    className={`${showCarousel ? '' : 'hidden'} ${
                        index === currentImage ? 'opacity-100' : 'opacity-0'
                    } fixed -z-10 h-screen w-full transition-opacity duration-1000`}
                >
                    <Image
                        src={src}
                        alt={alt}
                        className='scale-125 object-scale-down'
                        fill
                    />
                    <Image
                        src={src}
                        alt={alt}
                        className='-z-20 object-cover blur'
                        fill
                    />
                </div>
            ))}

            <button
                onClick={previousImage}
                className='mx-5 rounded-md bg-black px-4 py-2 text-white opacity-50 duration-200 hover:opacity-90'
            >
                {'<'}
            </button>

            <button
                onClick={nextImage}
                className='mx-5 rounded-md bg-black px-4 py-2 text-white opacity-50 duration-200 hover:opacity-90'
            >
                {'>'}
            </button>

            <div
                className={`absolute transition-all duration-700 ease-in-out ${
                    isMobile
                        ? 'bottom-[10%] left-[5%] text-2xl'
                        : 'bottom-[10%] left-[10%] text-5xl'
                } text-white`}
            >
                <p>3841 Biscayne Beach Rd</p>
                <p>Port Bolivar, TX</p>
            </div>

            <div
                className={`absolute ${
                    isMobile
                        ? 'bottom-[5%] right-[5%]'
                        : 'bottom-[10%] right-[10%]'
                } flex space-x-2`}
            >
                {images.map((_, index) => (
                    <div
                        className='py-2 hover:cursor-pointer'
                        onClick={() => setCurrentImage(index)}
                        key={index}
                    >
                        <div
                            className={`h-0.5 ${
                                isMobile ? 'w-8' : 'w-10'
                            } rounded-full bg-white ${
                                index === currentImage ? 'animate-pulse' : ''
                            }`}
                        ></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Carousel;
