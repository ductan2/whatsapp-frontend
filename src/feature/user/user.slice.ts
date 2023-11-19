/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ErrorResponse, initialStateType } from "../../types/type.custom";
import http from "../../utils/http";
import { LoginType, RegisterType, IUser } from "../../types/user.type";
import toast from "react-hot-toast";
const initialState: initialStateType & { user: IUser } = {
   loading: false,
   error: [],
   success: false,
   user: {
      _id: "",
      name: "",
      email: "",
      status: "",
      avatar: "",
      token: ""
   }
}

export const registerUser = createAsyncThunk(
   "auth/register",
   async (values: RegisterType, thunkAPI) => {
      try {
         const { data } = await http.post<RegisterType>("/auth/register", values, {
            signal: thunkAPI.signal
         });
         return data;
      } catch (error: any) {
         return thunkAPI.rejectWithValue(error.response.data.error);
      }
   }
);
export const loginUser = createAsyncThunk(
   "auth/login",
   async (values: LoginType, thunkAPI) => {
      try {
         const { data } = await http.post("/auth/login", values, {
            signal: thunkAPI.signal
         });
         return {
            user: data.result.user as IUser,
            token: data.result.access_token as string
         };
      } catch (error: any) {
         return thunkAPI.rejectWithValue(error.response.data.error);
      }
   }
);
export const logout = createAsyncThunk(
   "auth/logout",
   async (_, thunkAPI) => {
      try {
         await http.get("/auth/logout", {
            signal: thunkAPI.signal
         });
         return true;
      } catch (error: any) {
         return thunkAPI.rejectWithValue(error.response.data.error);
      }
   }
);

export const userSlice = createSlice({
   name: 'users',
   initialState: initialState,
   reducers: {

   },
   extraReducers(builder) {
      builder
         .addCase(registerUser.pending, (state) => {
            state.loading = true
         })
         .addCase(registerUser.fulfilled, (state) => {
            state.loading = false;
            state.success = true
            if (state.success) {
               toast.success("Register success. Please login")
               setTimeout(() => {
                  window.location.href = "/login"
               }, 500)
            }
         })
         .addCase(registerUser.rejected, (state, action) => {
            state.loading = false
            state.success = false
            state.error = action.payload as ErrorResponse[];
         })
         .addCase(loginUser.pending, (state) => {
            state.loading = true
         })
         .addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true
            if (state.success) {
               toast.success("Login success.")
               state.user = action.payload.user
               state.user.token = action.payload.token
               setTimeout(() => {
                  window.location.href = "/"
               }, 500)
            }
         })
         .addCase(loginUser.rejected, (state, action) => {
            state.loading = false
            state.success = false
            state.error = action.payload as ErrorResponse[];
         })
         .addCase(logout.pending, (state) => {
            state.loading = true
         })
         .addCase(logout.fulfilled, (state) => {
            state.loading = false;
            state.success = true
            state.user = {
               _id: "",
               name: "",
               email: "",
               status: "",
               avatar: "",
               token: ""
            }
         })
         .addCase(logout.rejected, (state, action) => {
            state.loading = false
            state.success = false
            state.error = action.payload as ErrorResponse[];
            if (state.error) {
               toast.error(state.error.toString())
            }
         })
   },
})
export default userSlice.reducer;