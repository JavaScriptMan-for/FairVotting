import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DataAction } from '../../src/types';

export interface AuthState {
    jwt: string | null | undefined;
    data: {
        _email: string;
        _password: string;
    },
    username: null | string | undefined,
    isAuth: boolean,
    isRegOneStep: boolean
}
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    jwt: null,
    data: {
        _email: "",
        _password: ""
    },
    username: null,
    isAuth: false,
    isRegOneStep: false,
  } as AuthState ,
  reducers: {
    setJwt(state, action: PayloadAction<string | null | undefined>) {
     state.jwt = action.payload
    },
    getData (state, action: PayloadAction<DataAction>) {
        state.data._email = action.payload._email;
        state.data._password = action.payload._password;
    },
    getUsername (state, action: PayloadAction<string | null | undefined>) {
      state.username = action.payload
    },
    setIsAuth (state, action: PayloadAction<boolean>) {
        state.isAuth = action.payload
    },
    setIsRegOneStep (state, action: PayloadAction<boolean>) {
      state.isRegOneStep = action.payload
    },

  },
});

export const { setJwt, getData, getUsername, setIsAuth, setIsRegOneStep } = authSlice.actions;
export default authSlice.reducer;