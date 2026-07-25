import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'; 

interface User {
    id: string;
    username: string;
    avatar?: string;
}


interface UserSchema {
    authData?: User;
    token?: string;
}

const initialState: UserSchema = {};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAuthData: (state, action: PayloadAction<{ user: User; token: string }>) => {
            state.authData = action.payload.user;
            state.token = action.payload.token;
            localStorage.setItem('token', action.payload.token); 
        },
   
        logout: (state) => {
            state.authData = undefined;
            state.token = undefined;
            localStorage.removeItem('token');
        },
    },
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
