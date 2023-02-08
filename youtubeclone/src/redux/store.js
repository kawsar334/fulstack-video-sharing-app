


import { configureStore } from '@reduxjs/toolkit'

import userRedux from "./AuthSlice";
import videoRedux from "./videoSlice"
import storage from 'redux-persist/lib/storage';
import { combineReducers } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { PersistGate } from "redux-persist/integration/react";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
const persistConfig = {
    key: "root",
    version: 1,
    storage,
};

const rootReducer = combineReducers({ user: userRedux, video: videoRedux });

const persistedReducer = persistReducer(persistConfig, rootReducer);

 const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store)
export default store





















// import { configureStore } from '@reduxjs/toolkit'

// import userRedux from "./AuthSlice";
// import videoRedux from "./videoSlice"

// export default configureStore({
//     reducer: {
//         user: userRedux,
//         video:videoRedux
//     }
// });

