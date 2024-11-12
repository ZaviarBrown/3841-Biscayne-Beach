import ParallaxImage from './ParallaxImage';

// TODO: Use or delete this component

export default function HomeHook() {
    return (
        <>
            <ParallaxImage src='/landingPhotos/deck.jpg' alt='Front Deck'>
                <div className='flex h-full w-full'>
                    <div className='w-1/3' />
                    <div className='flex w-2/3 flex-col items-center justify-center gap-3 bg-black bg-opacity-70 text-center text-white'>
                        <h1 className='w-1/2 text-6xl'>
                            Discover Your Perfect Beach Getaway
                        </h1>
                        <p className='w-1/2 text-2xl'>
                            3841 Biscayne Beach Road is an exclusive modern
                            experience for families, friends, and small
                            corporate events.
                        </p>
                        <p className='w-1/2 text-2xl'>
                            Situated in the Biscayne community of Bolivar Beach,
                            the house is steps away from beach access in a safe,
                            gated community.
                        </p>
                    </div>
                </div>
            </ParallaxImage>
        </>
    );
}
