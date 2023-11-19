/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ErrorResponse, initialStateType } from "../../types/type.custom";
import http from "../../utils/http";
import { IChat } from "../../types/chat.type";
import toast from "react-hot-toast";
const initialState: initialStateType & IChat = {
   loading: false,
   error: [],
   success: false,
   conversation: [],
   active_conversation: null,
   notification: [],
   messages: [],
   files: []
}

export const getConversation = createAsyncThunk(
   "conversation/get-conversation",
   async (token: string, thunkAPI) => {
      try {
         const { data } = await http.get("/conversation/", {
            signal: thunkAPI.signal,
            headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${token}`
            },
         });
         return data;
      } catch (error: any) {
         return thunkAPI.rejectWithValue(error.response.data.error);
      }
   }
);
export const openConversation = createAsyncThunk(
   "conversation/openConversation",
   async (payload: { receiver_id: string, token: string }, thunkAPI) => {
      try {
         const { data } = await http.post("/conversation/", { receiver_id: payload.receiver_id }, {
            signal: thunkAPI.signal,
            headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${payload.token}`
            },
         });
         return data;
      } catch (error: any) {
         return thunkAPI.rejectWithValue(error.response.data.error);
      }
   }
);
export const getMessages = createAsyncThunk(
   "message/getMessage",
   async (payload: { conv_id: string, token: string }, thunkAPI) => {
      try {
         const { data } = await http.get(`/message/${payload.conv_id}`, {
            signal: thunkAPI.signal,
            headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${payload.token}`
            },
         });
         return data;
      } catch (error: any) {
         return thunkAPI.rejectWithValue(error.response.data.error);
      }
   }
);
export const sendMessage = createAsyncThunk(
   "message/sendMessage",
   async (payload: { conv_id: string, files?: any[], message?: string, token: string }, thunkAPI) => {
      try {
         const { data } = await http.post(`/message`, payload, {
            signal: thunkAPI.signal,
            headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${payload.token}`
            },
         });
         return data;
      } catch (error: any) {
         return thunkAPI.rejectWithValue(error.response.data.error);
      }
   }
);

export const chatSlice = createSlice({
   name: 'chats',
   initialState: initialState,
   reducers: {
      setActiveConversation: (state, action) => {
         state.active_conversation = action.payload
      },
      updateMessages: (state, action) => {
         console.log(action.payload)
         const convo = state.active_conversation;
         if (convo && convo._id === action.payload.conversation._id) {
            state.messages = [...state.messages, action.payload]
         }
         const conves = state.conversation.find((conves) => {
            return conves._id === action.payload.conversation._id
         })
         conves!.latestMessage = action.payload
         const newConves = state.conversation.filter((conves) => conves._id !== action.payload.conversation._id)
         newConves.unshift(conves!)
         state.conversation = newConves
      },
      addFiles: (state, action) => {
         if (state.files.length >= 5) {
            toast.error("You can only send 5 file at a time")
            return
         }
         state.files = [...state.files, action.payload]
      },
      removeFile: (state, action) => {
         const tempFiles = state.files
         state.files = tempFiles.filter(({ file }) => {
            return file.name !== action.payload.file.name
         })
      },
      clearFiles: (state) => {
         state.files = []
      }
   },
   extraReducers(builder) {
      builder
         .addCase(getConversation.pending, (state) => {
            state.loading = true
         })
         .addCase(getConversation.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true
            if (state.success) {
               state.conversation = action.payload
            }
         })
         .addCase(getConversation.rejected, (state, action) => {
            state.loading = false
            state.success = false
            state.error = action.payload as ErrorResponse[];
         })
         .addCase(openConversation.pending, (state) => {
            state.loading = true
         })
         .addCase(openConversation.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true
            if (state.success) {
               state.active_conversation = action.payload
            }
         })
         .addCase(openConversation.rejected, (state, action) => {
            state.loading = false
            state.success = false
            state.error = action.payload as ErrorResponse[];
         })
         .addCase(getMessages.pending, (state) => {
            state.loading = true
         })
         .addCase(getMessages.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true
            if (state.success) {
               state.messages = action.payload
            }
         })
         .addCase(getMessages.rejected, (state, action) => {
            state.loading = false
            state.success = false
            state.error = action.payload as ErrorResponse[];
         })
         .addCase(sendMessage.pending, (state) => {
            state.loading = true
         })
         .addCase(sendMessage.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true
            if (state.success) {
               state.messages = [...state.messages, action.payload]
               const conves = state.conversation.find((conves) => {
                  return conves._id === action.payload.conversation._id
               })
               conves!.latestMessage = action.payload
               const newConves = state.conversation.filter((conves) => conves._id !== action.payload.conversation._id)
               newConves.unshift(conves!)
               state.conversation = newConves
            }
         })
         .addCase(sendMessage.rejected, (state, action) => {
            state.loading = false
            state.success = false
            state.error = action.payload as ErrorResponse[];
         })
   },
})
export const { setActiveConversation, updateMessages, addFiles, removeFile, clearFiles } = chatSlice.actions;
export default chatSlice.reducer;