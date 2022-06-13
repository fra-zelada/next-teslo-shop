import axios, { AxiosError } from 'axios';
import Cookies from 'js-cookie';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { FC, PropsWithChildren, useEffect, useReducer } from 'react';
import { tesloApi } from '../../api';
import { IUser } from '../../interfaces';
import { authReducer, AuthContext } from './';

export interface AuthState {
    isLoggedIn: boolean;
    user?: IUser;
}


const AUTH_INITIAL_STATE: AuthState = {
    isLoggedIn: false,
    user: undefined,
}


export const AuthProvider:FC<PropsWithChildren<any>> = ({ children }) => {

    const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE)
    const router = useRouter();

    const { data, status } = useSession()

    useEffect(() => {
        // console.log('logeado')
        
        if ( status === 'authenticated' ){
            dispatch({ type: '[Auth] - Login', payload: data?.user as IUser })
        }

    }, [ status, data ])

    // useEffect(() => {
    //     checkToken();
    // }, [])

    const checkToken = async() => {
        
        if ( !Cookies.get('token') )
        {
            return;
        }
        try {
            const { data } = await tesloApi.get('/user/validate-token');
            const { token, user } = data;
            Cookies.set('token', token);
            dispatch({type: '[Auth] - Login', payload: user})

        } catch (error) {
            Cookies.remove('token');
        }
    
    }

    const loginUser = async( email: string, password: string): Promise<boolean> => {
            
        try {
            
            const { data } = await tesloApi.post('/user/login', { email, password });
            const { token, user } = data;
            Cookies.set('token', token);
            dispatch({type: '[Auth] - Login', payload: user})
            return true;

        } catch (error) {
            return false;
        }
    
    }

    const registerUser = async( name: string, email: string, password: string ):Promise<{ hasError: boolean; message?: string }> => {
            
        try {
            const { data } = await tesloApi.post('/user/register', { name, email, password });
            const { token, user } = data;
            Cookies.set('token', token);
            dispatch({type: '[Auth] - Login', payload: user });
            return {
                hasError: false
            }
        } catch (error) {
            if ( axios.isAxiosError(error) ) {
                // const err = error as AxiosError
                const { message = '' } = error.response?.data as {message : string}
                return {
                    hasError: true,
                    message
                }
            }

            return {
                hasError: true,
                message: 'No se pudo crear el usuario - intente de nuevo'
            }
        }
    
    }

    const logout = () => {
            
        // Cookies.remove('token');
        Cookies.remove('cart');
        Cookies.remove('firstName');    
        Cookies.remove('lastName');    
        Cookies.remove('address'); 
        Cookies.remove('address2');    
        Cookies.remove('zip'); 
        Cookies.remove('city');    
        Cookies.remove('country'); 
        Cookies.remove('phone');

        signOut();
        // router.reload();
    
    }
    
    return (
        <AuthContext.Provider value={{
        //   isLoggedIn: false,
           ...state,
           loginUser,
           registerUser,
           logout
           
        }}>
           { children }
        </AuthContext.Provider>

)
}