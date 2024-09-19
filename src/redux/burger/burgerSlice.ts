import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'


interface IBurgerState {
    isOpen: boolean,
}

const initialState: IBurgerState = {
    isOpen: false,
}

const burgerSlice = createSlice({
  
    name: "burger",
    initialState,
    reducers: {
  
    isOpen(state,action: PayloadAction<IBurgerState["isOpen"]>) {
        state.isOpen = action.payload;
         
        },

       
      },
  
})



export const { isOpen } = burgerSlice.actions;

// Other code such as selectors can use the imported `RootState` type

export const selectBurgerState = (state: RootState) => state.burger.isOpen;


export default burgerSlice.reducer;