export interface ShirtSt {
    id: number
    price: number
    colors: String[]
    stock: number
    name: String

    select?: (a: CartItem) => any
    sold?: number
}

export interface CartItem {
    shirtID: number
    shirtC: String
    shirtQ: number
    shirtP: number
}

export interface OrderSt {
    name: String
    address: String
    email: String

    orderST?: Boolean
    cart: CartItem[]
}
