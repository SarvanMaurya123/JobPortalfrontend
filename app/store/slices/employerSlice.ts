// store/slices/emplouerSlice.ts
import urlemployer from '@/app/lib/employer';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Ensure credentials (cookies) are sent with requests
axios.defaults.withCredentials = true;

export interface AuthState {
    employer: {
        id: string;
        first_name: string;
        email: string;
        role: string;

    } | null;
    token: string | null;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    employer: null,
    token: null,
    loading: false,
    error: null,
};

// Async thunk for login
export const employerLogin = createAsyncThunk(
    'employer/login',
    async (
        credentials: { email: string; password: string; rememberMe: boolean },
        { rejectWithValue }
    ) => {
        try {
            const res = await axios.post(`${urlemployer}/login`, {
                email: credentials.email,
                password: credentials.password,
            });

            return res.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Login failed");
        }
    }
);

// Async thunk for logout
export const employerlogout = createAsyncThunk('employer/logout', async () => {
    await axios.post(`${urlemployer}/logout`);

});

const employerSlice = createSlice({
    name: 'authemployer',
    initialState,
    reducers: {
        resetError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(employerLogin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(employerLogin.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload.token;
                state.employer = action.payload.employer;
            })
            .addCase(employerLogin.rejected, (state, action: any) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(employerlogout.fulfilled, (state) => {
                state.employer = null;
                state.token = null;
            });
    },
});

export const { resetError } = employerSlice.actions;
export default employerSlice.reducer;
