import {combineReducers, configureStore} from '@reduxjs/toolkit'
import storage from "redux-persist/lib/storage"
import todoReducer from "./todoSlice"
import cardReducer from "./cardSlice"
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";


const rootReducer = combineReducers({
    todo: todoReducer,
    card: cardReducer,

})


const persistConfig = {
    key: "root",
    version: 1,
    storage,
    whitelist: ["todo","card"],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)


export const store=configureStore({
    reducer:persistedReducer,
    middleware:[]
})


export const persistor = persistStore(store)
