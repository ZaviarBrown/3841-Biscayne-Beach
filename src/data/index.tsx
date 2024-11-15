import Link from 'next/link';

// ? ---------------------------------------------------------------------------
// * ----- Types
// ? ---------------------------------------------------------------------------

export type HomeDetailsType = {
    textArr: (string | JSX.Element)[];
    src: string;
    alt: string;
};

export type StaticImagesType = Omit<HomeDetailsType, 'textArr'>;

// ! ---------------------------------------------------------------------------
// * ----- Data
// ! ---------------------------------------------------------------------------

export const homeDetails: HomeDetailsType[] = [
    {
        textArr: [
            '3841 Biscayne Beach Road is an exclusive modern experience for families, friends, and small events.',
            'Situated in the Biscayne community of Bolivar Beach, the house is steps away from beach access in a safe, gated community.',
        ],
        src: '/images/aerial-view.jpg',
        alt: "Bird's eye view",
    },
    {
        textArr: [
            'This "California Contemporary" house features 5 bedrooms, including a second story Master Bed and Bath with magnificent views of the Gulf of Mexico.',
            'Lay out on the massive sun deck while experiencing maximum comfort and detach from the rat race.',
        ],
        src: '/images/house-2.jpg',
        alt: 'Overhead view',
    },
    {
        textArr: [
            'The property is well equipped with all vacation rental amenities, including deck furniture, WIFI, smart TV, backup generator, washer/dryer, towels, bed linens, an outdoor shower with hot water, and kitchen cookware.',
        ],
        src: '/images/deck-2.jpg',
        alt: 'Deck with beach view',
    },
    {
        textArr: [
            'The Master Bedroom has a queen bed and full-sized sleeper sofa.',
            'Bedrooms 1 & 2 have queen beds, Bedroom 3 has a bunk bed with a trundle and floor mattress, while Bedroom 4 has 2 sets of bunk beds.',
            <>
                See the floor plan at the bottom of the{' '}
                {
                    <Link
                        className='text-blue-500 hover:underline'
                        href={'/gallery'}
                    >
                        Gallery
                    </Link>
                }{' '}
                page for more details.
            </>,
        ],
        src: '/images/bedroom-7.jpg',
        alt: 'Master bedroom',
    },
    {
        textArr: [
            'You bring the beach towels, personal toiletries, beach chairs and umbrellas, and we will provide shower soap, shampoo, toilet paper, paper towels, and coffee.',
            'Additional air mattresses are available upon request.',
        ],
        src: '/images/kitchen-2.jpg',
        alt: 'Kitchen wide-angle view',
    },
    {
        textArr: [
            'When you book directly through this website, we do not tack on any extra fees, the price you see is the price you pay.',
            <>
                Please carefully review the{' '}
                {
                    <Link
                        className='text-blue-500 hover:underline'
                        href={'/house-rules'}
                    >
                        House Rules
                    </Link>
                }{' '}
                and our{' '}
                {
                    <Link
                        className='text-blue-500 hover:underline'
                        href={'/house-rules'}
                    >
                        House Rules
                    </Link>
                }
                .
            </>,
            '  terms of service.',
            'If you need any assistance, please reach out to us using the contact form provided and we will get back to you as soon as possible.',
        ],
        src: '/images/house-sunset.jpg',
        alt: 'Sunset view from the deck',
    },
];

export const carouselImages: StaticImagesType[] = [
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

export const galleryImages: StaticImagesType[] = [
    {
        src: '/images/house.jpg',
        alt: 'house',
    },
    {
        src: '/images/house-3.jpg',
        alt: 'house-3',
    },
    {
        src: '/images/house-2.jpg',
        alt: 'house-2',
    },
    {
        src: '/images/aerial-view.jpg',
        alt: 'aerial-view',
    },
    {
        src: '/images/deck.jpg',
        alt: 'deck',
    },
    {
        src: '/images/deck-2.jpg',
        alt: 'deck-2',
    },
    {
        src: '/images/deck-3.jpg',
        alt: 'deck-3',
    },
    {
        src: '/images/deck-4.jpg',
        alt: 'deck-4',
    },
    {
        src: '/images/kitchen.jpg',
        alt: 'kitchen',
    },
    {
        src: '/images/kitchen-2.jpg',
        alt: 'kitchen-2',
    },
    {
        src: '/images/kitchen-3.jpg',
        alt: 'kitchen-3',
    },
    {
        src: '/images/kitchen-4.jpg',
        alt: 'kitchen-4',
    },
    {
        src: '/images/kitchen-5.jpg',
        alt: 'kitchen-5',
    },
    {
        src: '/images/bathroom.jpg',
        alt: 'bathroom',
    },
    {
        src: '/images/bedroom-5.jpg',
        alt: 'bedroom-5',
    },
    {
        src: '/images/bedroom-6.jpg',
        alt: 'bedroom-6',
    },
    {
        src: '/images/bedroom-7.jpg',
        alt: 'bedroom-7',
    },
    {
        src: '/images/bedroom-8.jpg',
        alt: 'bedroom-8',
    },
    {
        src: '/images/sunset.jpg',
        alt: 'sunset',
    },
    {
        src: '/images/aerial-view-2.jpg',
        alt: 'aerial-view-2',
    },
    {
        src: '/images/aerial-view-3.jpg',
        alt: 'aerial-view-3',
    },
    {
        src: '/images/bedroom-2.jpg',
        alt: 'bedroom-2',
    },
    {
        src: '/images/bedroom-3.jpg',
        alt: 'bedroom-3',
    },
    {
        src: '/images/bedroom-4.jpg',
        alt: 'bedroom-4',
    },
    {
        src: '/images/bedroom.jpg',
        alt: 'bedroom',
    },
    {
        src: '/images/deck-sunset.jpg',
        alt: 'deck-sunset',
    },
    {
        src: '/images/deck-sunset-2.jpg',
        alt: 'deck-sunset-2',
    },
    {
        src: '/images/house-sunset.jpg',
        alt: 'house-sunset',
    },
    {
        src: '/images/family-2.jpg',
        alt: 'family-2',
    },
    {
        src: '/images/family.jpg',
        alt: 'family',
    },
    {
        src: '/images/ocean.jpg',
        alt: 'ocean',
    },
    {
        src: '/images/sunset-2.jpg',
        alt: 'sunset-2',
    },
    {
        src: '/images/sunset-3.jpg',
        alt: 'sunset-3',
    },
    {
        src: '/images/sunset-4.jpg',
        alt: 'sunset-4',
    },
    {
        src: '/images/sunset-5.jpg',
        alt: 'sunset-5',
    },
    {
        src: '/images/sunset-6.jpg',
        alt: 'sunset-6',
    },
];


export const rules = [
    'No pets.',
    'No smoking on property.',
    'No parties / gatherings.',
    'No loud noises or music.',
    'No fishing in the ponds.',
    'No bait inside the house.',
    'No banners, signs or flags.',
    'No firearms.',
    'No illegal substances.',
    'Park in the driveway or under the house (concrete) only.',
];

export const checkout = [
    'Contactless check-in at 3pm, check-out at 11am.',
    'Your host is local for your assistance and to ensure the rules are followed.',
    'You will be provided the gate code and door code within 48 hours of your stay.',
    'Please remove everything you brought including refrigerated food, trash, and consumable products.',
    'Upon checkout, please bundle used bedclothes on the floor and we will wash them for the next guest.',
    'Please start the dishwasher for us and leave things as you found them.',
    'All trash should be taken out in bags and tied up.',
    'Please do not throw loose trash in the cans and do not overfill the cans.',
    'If you have more trash than the cans hold, leave it in bags tied up on the deck by the front steps.',
    'No Cheetos. People who turn their kids loose with a bag of Cheetos inside the house will be charged additional cleaning fee.',
];

export const policies = [
    'By booking with us, you agree to follow all rules listed on this page.',
    'You must be 25 to book a reservation through this site.',
    'There must be an equal ratio of Adult guests over 25 to prevent unwanted adolescent parties.',
    'Purchases through our platform are 100% handled by Stripe: we never see your card info.',
    'Stripe charges a card processing fee for every transaction. We cover this fee when you book with us, but this fee is non-refundable for cancellations. Card processing fees are non-refundable.',
    'Once selected, your dates are reserved for 15 minutes so you can complete your purchase. If you do not complete your purchase during that time, your booking will be deleted and you will not be charged.',
    'There is a 5 night minimum for every booking.',
    'You must pay for the entirety of your stay at the time of booking.',
    'Bookings cancelled with more than 14 days notice will receive a full refund, minus the aforementioned Stripe fee.',
    'Bookings cancelled with at least 3 days notice will receive a refund equivalent to 50% of the total booking cost.',
    'Bookings cancelled with less than 3 days notice will receive no refund.',
    <>
        If you wish to cancel a Booking, you can do so on the{' '}
        {
            <Link
                className='text-blue-500 hover:underline'
                href={'/your-bookings'}
            >
                Your Bookings
            </Link>
        }{' '}
        page.
    </>,
];
