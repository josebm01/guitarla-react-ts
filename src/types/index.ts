export type GuitarI = {
    id: number;
    name: string;
    image: string;
    description: string;
    price: number;
}

export type AddToCartI = ( item: GuitarI ) => void
