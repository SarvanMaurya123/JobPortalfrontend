// store/slices/authSlice.ts
import url from '@/app/lib/url';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Ensure credentials (cookies) are sent with requests
axios.defaults.withCredentials = true;

export interface AuthState {
    user: {
        id: string;
        full_name: string;
        email: string;
        role: string;
    } | null;
    token: string | null;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    token: null,
    loading: false,
    error: null,
};

// Async thunk for login
export const login = createAsyncThunk(
    'auth/login',
    async (
        credentials: { email: string; password: string; rememberMe: boolean },
        { rejectWithValue }
    ) => {
        try {
            const res = await axios.post(`${url}/login`, {
                email: credentials.email,
                password: credentials.password,
            });

            if (credentials.rememberMe) {
                localStorage.setItem('authToken', res.data.token);
                localStorage.setItem('user', JSON.stringify(res.data.user));
            }

            return res.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Login failed");
        }
    }
);

// Async thunk for logout
export const logout = createAsyncThunk('auth/logout', async () => {
    await axios.post(`${url}/logout`);
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        resetError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload.token;
                state.user = action.payload.user;
            })
            .addCase(login.rejected, (state, action: any) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
                state.token = null;
            });
    },
});

export const { resetError } = authSlice.actions;
export default authSlice.reducer;
