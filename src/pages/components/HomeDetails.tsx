/* eslint-disable @next/next/no-img-element */
import React from "react";
import ImageRow from "./ImageRow";

const dummyData = [
    {
        image: "/tempPhotos/1_front.jpg",
        description:
            "Nestled along the pristine shores of the Gulf of Mexico, this exquisite Airbnb listing offers a truly unforgettable coastal experience. With its breathtaking views, luxurious amenities, and proximity to the beach, this home is the perfect retreat for your next vacation.",
    },
    {
        image: "/tempPhotos/3_kitchen.jpg",
        description:
            "The fully equipped gourmet kitchen is a culinary enthusiast's dream. Boasting modern appliances, ample counter space, and a large island with bar seating, it provides everything you need to whip up delicious meals. Whether you're hosting a family dinner or preparing a quick beachside picnic, this kitchen has you covered.",
    },
    {
        image: "/tempPhotos/4_roomAndBath.jpg",
        description:
            "The beachside home features multiple bedrooms, each thoughtfully designed to offer comfort and tranquility. The master suite is a true oasis, complete with a king-sized bed, a private balcony, and an en-suite bathroom featuring a deep soaking tub and a walk-in shower. Additional bedrooms offer cozy accommodations, ensuring a good night's rest for everyone.",
    },
    {
        image: "/tempPhotos/6_sunset.jpg",
        description:
            "Step outside onto the expansive deck, and you'll find the epitome of outdoor living. The deck is equipped with comfortable lounge chairs and a dining area, providing the perfect spot to savor your morning coffee or unwind with a cocktail while enjoying the breathtaking sunsets over the Gulf. A private walkway leads directly to the beach, allowing you to easily dip your toes in the sand or take a leisurely stroll along the shoreline.",
    },
];

function HomeDetails() {
    return (
        <div>
            {dummyData.map((el, i) => (
                <ImageRow key={i} {...el} order={i} />
            ))}
        </div>
    );
}

export default HomeDetails;
