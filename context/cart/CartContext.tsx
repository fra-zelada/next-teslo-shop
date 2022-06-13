import { createContext } from 'react';
import { ICartProduct, ShippingAddress } from '../../interfaces';


interface ContextProps {
    isLoaded: boolean,
    cart: ICartProduct[];
    numberOfItems: number;
    subTotal: number;
    tax: number;
    total: number;
    shippingAddress? : ShippingAddress;
    
    
    createOrder: () => Promise<{ hasError: boolean; message: string; }>;
    addProductToCart: (product: ICartProduct) => void;
    updateCartQuantity: (product: ICartProduct) => void;
    removeCartProduct: (product: ICartProduct) => void;
    limpiarCookie: () => void;
    updateAddress: (address: ShippingAddress) => void;
}


export const CartContext = createContext({} as ContextProps);