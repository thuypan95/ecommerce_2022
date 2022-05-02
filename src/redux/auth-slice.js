import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authApi from "../api/auth";
export const login = createAsyncThunk('auth/login', async (data, thunkAPI) => {
    const { email, password } = data;
    //muon dispatch 1 action khac: thunkAPI.dispatch(...)
    const responseLogin = await authApi.loginApi(email, password);
    return responseLogin;
})
export const registration = createAsyncThunk('auth/registration', async (data, thunkAPI) => {
    const { email, password } = data;
    const responseRegister = await authApi.registerApi(email, password);
    return responseRegister;
})

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: '',
        username: '',
        isLogin: false,
        loading: false,
        id: ''
    },
    reducers: {
        logout(state) {
            state.token = '';
            state.isLogin = false;
            state.username = '';
            state.id = '';
        }
    },
    extraReducers: {
        [login.pending]: (state) => {
            state.loading = true;
        },
        [login.rejected]: (state) => {
            state.loading = false;
        },
        [login.fulfilled]: (state, action) => {
            state.loading = false;
            state.token = action.payload.token;
            state.username = action.payload.username;
            state.isLogin = action.payload.isLogin;
            state.id = action.payload.id;
        },
        [registration.pending]: (state) => {
            state.loading = true;
        },
        [registration.rejected]: (state) => {
            state.loading = false;
        },
        [registration.fulfilled]: (state) => {
            state.loading = false;
        }
    }
});
export const AuthActions = authSlice.actions;
export default authSlice;