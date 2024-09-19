import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'


// Define a type for the slice state

export interface IUserState {
  user: {
    login: string | null;
    token: string | null;
    date: string | null;

  },
  userInfo: {
    usedCompanyCount: number | null;
    companyLimit: number | null;
  }
  
}

// Define the initial state using that type

const initialState: IUserState = {
  user: {
    login: null,
    token: null,
    date: null,
    
  },
  userInfo: {
    usedCompanyCount: null,
    companyLimit: null,
  }
  
} 

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
      login(state,  action: PayloadAction<IUserState["user"]>) {
          state.user.login = action.payload.login;
          state.user.token = action.payload.token;
          state.user.date = action.payload.date;
          
        },

        setUserInfo(state,  action: PayloadAction<IUserState["userInfo"]>) {
          state.userInfo.usedCompanyCount = action.payload.usedCompanyCount;
          state.userInfo.companyLimit = action.payload.companyLimit;
        },
        
      logout(state) {
        state.user.login = null;
        state.user.token = null;
        state.user.date = null;
      
      }
  },
});

export const { login, setUserInfo, logout } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type

export const selectUser = (state: RootState) => state.user.user.token;
export const selectTokenDate = (state: RootState) => state.user.user.date;
export const selectUsedCompanyCount = (state: RootState) => state.user.userInfo.usedCompanyCount;
export const selectCompanyLimit = (state: RootState) => state.user.userInfo.companyLimit;

export default userSlice.reducer;