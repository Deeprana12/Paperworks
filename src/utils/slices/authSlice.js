import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        token: null,
        email: null,
        name: null
    },
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
        },
        setEmail: (state, action) => {
            state.email = action.payload;
        },
        setName: (state, action) => {
            state.name = action.payload;
        },
        clearAuth: (state) => {
            state.token = null;
            state.email = null;
            state.name = null;
        },
    }
})

export const { setToken, setEmail, setName, clearAuth } = authSlice.actions;

export default authSlice.reducer;