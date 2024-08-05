import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LocationState {
    latitude: number | null;
    longitude: number | null;
    error: string | null;
}

const initialState: LocationState = {
    latitude: null,
    longitude: null,
    error: null,
};

const locationSlice = createSlice({
    name: 'location',
    initialState,
    reducers: {
        setLocation: (state, action: PayloadAction<{ latitude: number; longitude: number }>) => {
            state.latitude = action.payload.latitude;
            state.longitude = action.payload.longitude;
            state.error = null;
        },
        setLocationError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
    },
});

export const { setLocation, setLocationError } = locationSlice.actions;
export default locationSlice.reducer;