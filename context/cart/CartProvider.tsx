import { FC, PropsWithChildren, useEffect, useReducer } from 'react';
import { ICartProduct } from '../../interfaces';
import { cartReducer, CartContext } from './';
import Cookie from 'js-cookie'
import { IProduct } from '../../interfaces/';
import { OrderSummary } from '../../components/cart/OrderSummary';

export interface CartState {
    isLoaded: boolean;
    cart: ICartProduct[];
    numberOfItems: number;
    subTotal: number;
    tax: number;
    total: number;
    shippingAddress? : ShippingAddress;
}

export interface ShippingAddress  {
    firstName : string;
    lastName : string;
    address  : string;
    address2?: string;
    zip      : string;
    city     : string;
    country  : string;
    phone    : string;
}

// const CART_INITIAL_STATE: CartState = {
//     cart: []
// }

 const CART_INITIAL_STATE: CartState = {
    // cart: Cookie.get('cart') ? JSON.parse(Cookie.get('cart')!) : []
    isLoaded: false,
    cart: [],
    numberOfItems: 0,
    subTotal: 0,
    tax: 0,
    total: 0,
    shippingAddress : undefined
  }     

export const CartProvider:FC<PropsWithChildren<any>> = ({ children }) => {

    const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE)

  useEffect(() => {
        try {
            const cookieProducts = Cookie.get('cart') ? JSON.parse( Cookie.get('cart')! ): []
            dispatch({ type: '[Cart] - LoadCart from cookies | storage', payload: cookieProducts });
        } catch (error) {
            dispatch({ type: '[Cart] - LoadCart from cookies | storage', payload: [] });
        }
    //   return () => {
    //     console.log(' desmontando componente ')
    //     console.log('carrito desmontando componente', state.cart)
    //     if ( state.cart.length > 0 ){
        
    //     Cookie.set('cart', JSON.stringify( state.cart ));        
    // }
    //   }
  }, [])
    
        useEffect(() => {
            if ( Cookie.get('firstName') )
            {
                const shippingAddress: ShippingAddress = {
                        firstName  :  Cookie.get('firstName') || '',
                        lastName  :  Cookie.get('lastName') || '',
                        address   :  Cookie.get('address') || '',
                        address2  :  Cookie.get('address2') || '',
                        zip       :  Cookie.get('zip') || '',
                        city      :  Cookie.get('city') || '',
                        country   :  Cookie.get('country') || '',
                        phone     :  Cookie.get('phone') || ''
                }
                dispatch({type: '[Cart] - LoadAddress from Cookies', payload: shippingAddress })
            }
        }, [])


    useEffect(() => {

    if ( state.cart.length > 0 )
    Cookie.set('cart', JSON.stringify( state.cart ), { expires: 365 });
    
    }, [state.cart]);

    useEffect(() => {

        const numberOfItems = state.cart.reduce( ( prev, current ) => current.quantity + prev , 0 )
        const subTotal = state.cart.reduce( ( prev, current ) => (current.price * current.quantity) + prev ,0 )
        const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);
        
        const orderSummary = {
            numberOfItems ,
            subTotal,
            tax: subTotal * taxRate,
            total: subTotal * ( taxRate + 1)
        }

        dispatch({type: '[Cart] - Update order Summary', payload: orderSummary})
        
    }, [state.cart]);


    // useEffect(() => {
    //     const cookieProducts = Cookie.get('cart') ? JSON.parse( Cookie.get('cart')! ): []
    //     dispatch({ type: '[Cart] - LoadCart from cookies | storage', payload: cookieProducts});
    // }, [])

    // useEffect(() => {
    //     Cookie.set('cart', JSON.stringify( state.cart ))
    // }, [ state.cart ])

    const addProductToCart = ( product: ICartProduct) => {
         // solucion1   
        // dispatch({type: '[Cart] - Add Product', payload: product})
        //solucion 2
        // const productInCart = state.cart.filter( p => p._id !== product._id && p.size !== product.size )
        // dispatch({ type: '[Cart] - Add Product', payload:[...productInCart, product]})
        //solución final
        const productInCart = state.cart.some( p => p._id === product._id );
        if ( !productInCart ) {
            return dispatch({type: '[Cart] - Update products in cart', payload: [...state.cart, product] })
        }

        const productInCartButDifferentSize = state.cart.some( p => p._id === product._id && p.size === product.size )
        if (! productInCartButDifferentSize ) {
            return dispatch({type: '[Cart] - Update products in cart', payload: [...state.cart, product] })}
        
        // ACUMULAR
        const updatedProducts = state.cart.map ( p => {
            if ( p._id !== product._id ) return p;
            if ( p.size !== product.size) return p;

            //Actualizar la cantidad
            p.quantity += product.quantity;
            return p;
        })
        
        dispatch({type: '[Cart] - Update products in cart', payload: updatedProducts })

    }

    const updateCartQuantity = ( product: ICartProduct) => {
            
        dispatch({ type: '[Cart] - Change cart quantity' , payload: product })
    
    }

    const removeCartProduct = ( product: ICartProduct ) => {
            
        dispatch({ type: '[Cart] - Remove product in cart', payload: product })
        console.log(state.cart)
        
    }

    const limpiarCookie = () => {
            
        Cookie.set('cart', `[]`);
    
    }

    const updateAddress = ( address : ShippingAddress) => {
        
        Cookie.set('firstName',address.firstName);    
        Cookie.set('lastName',address.lastName);    
        Cookie.set('address',address.address); 
        Cookie.set('address2',address.address2 || '');    
        Cookie.set('zip',address.zip); 
        Cookie.set('city',address.city);    
        Cookie.set('country',address.country); 
        Cookie.set('phone',address.phone);   
        dispatch({ type:'[Cart] - Update Address', payload: address })
    
    }

    return (
        <CartContext.Provider value={{
        //   cart: []
           ...state,

           addProductToCart ,
           updateCartQuantity,
           removeCartProduct,
           limpiarCookie,
           updateAddress
        }}>
           { children }
        </CartContext.Provider>

)
}