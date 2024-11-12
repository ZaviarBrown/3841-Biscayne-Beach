import type { NextPage, InferGetStaticPropsType, GetStaticProps } from 'next';

import Carousel from '../components/Home/Carousel';
import HomeDetails from '../components/Home/HomeDetails';
import GoogleMapsEmbed from '~/components/Home/GoogleMapsEmbed';

export type HomeDetailsType = {
    text: string;
    src: string;
    alt: string;
};

export type StaticImagesType = Omit<HomeDetailsType, 'text'>;

// TODO: Image Optimization & Better SSR

export const getStaticProps = (() => {
    const homeDetails = [
        {
            text: '3841 Biscayne Beach Road is an exclusive modern experience for families, friends, and small events. Situated in the Biscayne community of Bolivar Beach, the house is steps away from beach access in a safe, gated community',
            src: '/images/aerial-view.jpg',
            alt: "Bird's eye view",
        },
        {
            text: 'This "California Contemporary" house features 5 bedrooms including a second story Master Bed and Bath with magnificent views of the Gulf of Mexico',
            src: '/images/house-2.jpg',
            alt: 'Overhead view',
        },
        {
            text: 'Lay out on the massive sun deck while experiencing maximum comfort and detach from the rat race. The property is well equipped with all vacation rental amenities including deck furniture, WIFI, smart TV, Backup generator, washer/dryer, outdoor shower with hot water, and kitchen cookware. Towels and bed linens are included',
            src: '/images/deck-2.jpg',
            alt: 'Deck with beach view',
        },
        {
            text: 'The Master Bedroom has a queen bed and full-sized sleeper sofa. Bedrooms 1 & 2 have queen beds and Bedroom 3 has a bunk bed with a trundle and floor mattress while Bedroom 4 has 2 sets of bunk beds. Additional air Mattresses are available upon request. See the floor plan for more details',
            src: '/images/bedroom-7.jpg',
            alt: 'Master bedroom',
        },
        {
            text: 'You bring the beach towels, personal toiletries, beach chairs and umbrellas, and we will provide shower soap, shampoo, toilet paper, paper towels, and coffee',
            src: '/images/kitchen-2.jpg',
            alt: 'Kitchen wide-angle view',
        },
        {
            text: `When you book directly through this website, we do not tack on any extra fees, the price you see is the price you pay. Please carefully review the house rules and our terms of service.  If you need any assistance, please reach out to us using the contact form provided and we will get back to you as soon as possible`,
            src: '/images/house-sunset.jpg',
            alt: 'Sunset view from the deck',
        },
    ];

    const carouselImages = [
        {
            src: '/images/house.jpg',
            alt: 'Side view of home',
        },
        {
            src: '/images/kitchen-3.jpg',
            alt: 'Kitchen full view',
        },
        {
            src: '/images/deck.jpg',
            alt: 'Full deck view with lounge chairs',
        },
        {
            src: '/images/bedroom-5.jpg',
            alt: 'Adult bedroom wide-angle view',
        },

        {
            src: '/images/bathroom.jpg',
            alt: 'Bathroom with standing shower',
        },
        {
            src: '/images/sunset.jpg',
            alt: 'View of the neighborhood during a sunset',
        },
    ];

    return { props: { homeDetails, carouselImages } };
}) satisfies GetStaticProps<{
    homeDetails: HomeDetailsType[];
    carouselImages: StaticImagesType[];
}>;

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
    homeDetails,
    carouselImages,
}) => {
    return (
        <>
            <Carousel images={carouselImages} />
            <HomeDetails homeDetails={homeDetails} />
            <GoogleMapsEmbed />
        </>
    );
};

export default Home;
