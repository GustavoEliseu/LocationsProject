import { configureStore } from '@reduxjs/toolkit';
import locationReducer from '../slices/locationSlice';
import locationsSearchReducer from '../slices/locationsSearchSlice';

const locationStore = configureStore({
    reducer: {
        location: locationReducer,
        locationsSearch: locationsSearchReducer,
    },
});

export type RootState = ReturnType<typeof locationStore.getState>;
export type AppDispatch = typeof locationStore.dispatch;

export default locationStore;