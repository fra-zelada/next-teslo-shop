import { FC, PropsWithChildren, useReducer } from 'react';
import { uiReducer, UiContext } from './';

export interface UiState {
    isMenuOpen: boolean;
}


const UI_INITIAL_STATE: UiState = {
    isMenuOpen: false
}


export const UiProvider:FC<PropsWithChildren<any>> = ({ children }) => {

    const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE)

    const toggleSideMenu = () => {
            
        dispatch({type: '[UI] - ToggleManu'})
    
    }

    return (
        <UiContext.Provider value={{
        //   isMenuOpen: false
           ...state,
           
           toggleSideMenu
        }}>
           { children }
        </UiContext.Provider>

)
}