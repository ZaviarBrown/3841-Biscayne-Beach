export interface FloorPlan {
    name: string;
    bedrooms: number;
    bathrooms: number;
    sqft: number;
    price: string;
    description: string;
    imageUrl: string;
}

export interface Amenity {
    name: string;
    description: string;
    icon: string;
    category: "community" | "apartment";
}
