import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Location {
    latitude: number;
    longitude: number;
    name: string;
}

interface LocationSearchState {
    searchResults: Location[];
    error: string | null;
}

const initialState: LocationSearchState = {
    searchResults: [],
    error: null,
};

const locationSearchSlice = createSlice({
    name: 'locationSearch',
    initialState,
    reducers: {
        setSearchResults: (state, action: PayloadAction<Location[]>) => {
            state.searchResults = action.payload;
            state.error = null;
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        }
    },
});

export const { setSearchResults, setError } = locationSearchSlice.actions;
export default locationSearchSlice.reducer;