import type { FloorPlan } from "../types";

export const floorplans: FloorPlan[] = [
    {
        name: "The Gilbert",
        bedrooms: 1,
        bathrooms: 1,
        sqft: 750,
        price: "From $1,695",
        description:
            "Modern 1-bedroom townhome with an attached two-car garage and private entry.",
        imageUrl:
            "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80",
    },
    {
        name: "The Heritage",
        bedrooms: 2,
        bathrooms: 2,
        sqft: 1150,
        price: "From $1,995",
        description:
            "Spacious 2-bedroom townhome featuring premium finishes and an open concept layout.",
        imageUrl:
            "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&q=80",
    },
    {
        name: "The Downtown",
        bedrooms: 3,
        bathrooms: 2.5,
        sqft: 1450,
        price: "From $2,395",
        description:
            "Luxurious 3-bedroom townhome perfect for families, featuring a gourmet kitchen and spacious living areas.",
        imageUrl:
            "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&q=80",
    },
];
