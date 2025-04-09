export type GuitarI = {
    id: number;
    name: string;
    image: string;
    description: string;
    price: number;
}

// &  - herencia
export type CartItem = GuitarI & {
    quantity: number;
}

// lookup - Solo acepta un valor de un Type
export type GuitarID = GuitarI['id'];

//* Pick - Escoger ciertos elementos de un Type
//* Omit - Omite ciertos elementos del Type
// export type CartItemI = Pick<GuitarI, 'id'| 'name'> & {
//     quantity: number;
// }


export type AddToCartI = ( item: GuitarI ) => void
