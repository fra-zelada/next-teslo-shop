import { UiState } from './';

type UiActionType = 
 | { type: '[UI] - ToggleManu' };

export const uiReducer = ( state: UiState, action: UiActionType ): UiState => {

    switch (action.type) {
        case '[UI] - ToggleManu':
            return {
                ...state,
                isMenuOpen: !state.isMenuOpen
            };

         default:
             return state;
     }

}