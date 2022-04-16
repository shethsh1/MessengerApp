import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { socket } from "../../context/socket";
import axios from "axios";

export const authLogin = createAsyncThunk(
    'auth/login',
    async (credentials, { rejectWithValue }) => {

        try {
            const response = await axios.post("/auth/login", credentials);
            return response.data
        } catch (err) {
            return rejectWithValue(err.response.data.error || "Server Error")


        }
    }
)

export const authRegister = createAsyncThunk(
    'auth/register',
    async (credentials, { rejectWithValue }) => {
        try {
            const { data } = await axios.post("/auth/register", credentials);
            return data
        } catch (err) {
            return rejectWithValue(err.response.data.error || "Server Error")
        }
    }
)

export const authLogout = createAsyncThunk(
    'auth/logout',
    async (id, { rejectWithValue }) => {
        try {
            await axios.delete("/auth/logout");
            return id
        } catch (err) {
            return rejectWithValue(err.response.data)
        }
    }
)


export const tokenLogin = createAsyncThunk(
    'auth/user',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get("/auth/user");
            return data
        } catch (err) {
            return rejectWithValue(err.response.data)
        }


    }
)

export const authSlice = createSlice({
    name: "authReducer",
    initialState: {
        user: {},
        isFetching: true
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        }
    },
    extraReducers: {
        //LOGIN
        [authLogin.pending]: (state) => {

            state.status = 'loading'
        },
        [authLogin.fulfilled]: (state, action) => {

            const { id, token } = action.payload
            localStorage.setItem("messenger-token", token);
            socket.emit("go-online", id);
            state.status = 'succeeded'
            state.user = action.payload
        },
        [authLogin.rejected]: (state, action) => {

            state.status = 'failed';
            state.user = { 'error': action.payload };

        },

        //REGISTER
        [authRegister.pending]: (state) => {

            state.status = 'loading'
        },
        [authRegister.fulfilled]: (state, action) => {

            const { id, token } = action.payload

            localStorage.setItem("messenger-token", token);
            socket.emit("go-online", id);
            state.status = 'succeeded'
            state.user = action.payload

        },
        [authRegister.rejected]: (state, action) => {

            state.status = 'failed';
            state.user = { 'error': action.payload };


        },
        //LOGOUT
        [authLogout.pending]: (state) => {

            state.status = 'loading'
        },

        [authLogout.fulfilled]: (state, action) => {

            const id = action.payload
            state.status = 'succeeded'
            state.user = {}
            localStorage.removeItem("messenger-token");
            console.log('logging out')
            console.log(id)
            socket.emit("logout", id);


        },

        [authLogout.rejected]: (state, action) => {

            state.status = 'failed'
            console.log(action.payload)

        },

        //TOKENLOGIN
        [tokenLogin.pending]: (state) => {

            state.isFetching = true
        },

        [tokenLogin.fulfilled]: (state, action) => {
            const { id } = action.payload
            if (id) {

                socket.emit("go-online", id);
                state.user = action.payload
            }
            state.status = 'succeeded'
            state.isFetching = false


        },

        [tokenLogin.rejected]: (state, action) => {
            state.status = 'failed'
            console.log(action.payload)
        },
    }


});


export const { setUser } = authSlice.actions

export default authSlice.reducer;