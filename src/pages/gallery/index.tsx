import { useEffect, useState } from 'react';
import GalleryCard from '~/components/Gallery/Card';
import LoadingCard from '~/components/Gallery/Loading';
import FullScreenView from '~/components/Gallery/FullScreenView';
import { useMobileContext } from '~/context/MobileContext';
import { useModalContext } from '~/context/ModalContext';
import NavBarSpacer from '~/components/Home/NavBarSpacer';
import { galleryImages } from '~/data';

export default function Gallery() {
    const [load, setLoad] = useState(0);
    const [fullView, setFullView] = useState<JSX.Element>();
    const { isMobile } = useMobileContext();
    const { bgColor, setBgColor, setModalContent, setGalleryIndex } =
        useModalContext();

    useEffect(() => {
        if (load < galleryImages.length) {
            const fade = setTimeout(() => setLoad(load + 1), 100);

            return () => clearTimeout(fade);
        }
    }, [load]);

    useEffect(() => {
        setFullView(() => <FullScreenView galleryImages={galleryImages} />);
    }, []);

    return (
        <>
            <NavBarSpacer />
            {galleryImages.length !== 0 && (
                <>
                    <div className='grid grid-cols-1 gap-5 p-5 md:grid-cols-2 lg:grid-cols-3'>
                        {galleryImages.map(({ src, alt }, i) => (
                            <div
                                key={i}
                                onClick={() => {
                                    if (bgColor !== 'transparent')
                                        setBgColor('transparent');
                                    setGalleryIndex(i);
                                    setModalContent(fullView);
                                }}
                            >
                                <GalleryCard
                                    src={src}
                                    alt={alt}
                                    load={load > i}
                                    priority={i === 0}
                                />
                            </div>
                        ))}
                    </div>
                    {isMobile ? (
                        <a
                            className='mb-5 self-center rounded-lg border-2 border-slate-200 bg-slate-700 p-2 text-center text-lg text-white shadow-3xl'
                            target='_blank'
                            rel='noopener noreferrer'
                            href='https://utfs.io/f/2a6d41f8-d561-4184-96d8-9dddecc9949b-4tj1v9.pdf'
                        >
                            Tap here to view Floor Plan PDF
                        </a>
                    ) : (
                        <iframe
                            className='h-screen w-3/4 self-center p-10'
                            src='/assets/FloorPlan.pdf'
                        />
                    )}
                </>
            )}
            {galleryImages.length === 0 && (
                <div className='grid grid-cols-1 gap-5 p-5 md:grid-cols-2 lg:grid-cols-3'>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((_, i) => (
                        <LoadingCard key={i} />
                    ))}
                </div>
            )}
        </>
    );
}
