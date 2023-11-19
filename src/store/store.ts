import { configureStore, combineReducers } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux"
import createFilter from "redux-persist-transform-filter"
import storage from "redux-persist/lib/storage"
import persistReducer from "redux-persist/es/persistReducer"
import persistStore from "redux-persist/es/persistStore"
import chatSlice from "../feature/chat/chat.slice"
import userSlice from "../feature/user/user.slice"
const saveUserOnlyFilter = createFilter("user", ["user"])
const persistConfig = {
   key: "user",
   storage,
   whitelist: ["user"],
   transform: [saveUserOnlyFilter]
}
const rootReducer = combineReducers({
   user: userSlice,
   chat: chatSlice
})
const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = configureStore({
   reducer: persistedReducer,
   middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: false
   }),
   devTools: true
})

export type RootState = ReturnType<typeof store.getState>
export const persistor = persistStore(store)
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
