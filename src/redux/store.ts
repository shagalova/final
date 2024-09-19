import { configureStore } from '@reduxjs/toolkit'
/// <reference types="redux-persist" />
import storage from 'redux-persist/lib/storage';
import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import { persistStore } from 'redux-persist';

import {
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';

import userReducer from './users/userSlice';
import searchReducer from './search/searchSlice';
import burgerReducer from './burger/burgerSlice';

const persistConfig = {
    key: 'scan',
	storage,
}

const rootReducer = combineReducers({ 

    user: userReducer,
    search: searchReducer,
    burger: burgerReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
 
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        },
    }) 
})

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch