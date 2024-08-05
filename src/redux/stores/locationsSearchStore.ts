import { configureStore } from '@reduxjs/toolkit';
import locationsSearchReducer from '../slices/locationsSearchSlice';

const locationsSearchStore = configureStore({
    reducer: {
        locationsSearch: locationsSearchReducer,
    },
});

export type LocationsState = ReturnType<typeof locationsSearchStore.getState>;

export default locationsSearchStore;