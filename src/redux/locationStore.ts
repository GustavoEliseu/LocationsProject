import { configureStore } from '@reduxjs/toolkit';
import locationReducer from './locationSlice';

const locationStore = configureStore({
    reducer: {
        location: locationReducer,
    },
});

export type RootState = ReturnType<typeof locationStore.getState>;
export type AppDispatch = typeof locationStore.dispatch;

export default locationStore;