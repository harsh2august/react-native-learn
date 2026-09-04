export interface Property {
    id: string;
    title: string;
    description: string | null;
    price: number;
    type: string;
    bedrooms: number;
    bathrooms: number;
    area_sqft: number | null;
    address: string;
    city: string;
    latitude: number | null;
    longitude: number | null;
    images: string[] | null;
    is_featured: boolean | null;
    is_sold: boolean | null;
    created_at: string;
}