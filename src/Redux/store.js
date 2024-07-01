import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import countrySlice from './countrySlice';
import borderSlice from './borderSlice'; // Make sure to import the border slice reducer

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  countries: countrySlice,
  border: borderSlice.reducer, // Use the reducer from the border slice
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
