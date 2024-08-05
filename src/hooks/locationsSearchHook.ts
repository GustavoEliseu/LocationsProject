import { useDispatch, useSelector } from 'react-redux';
import { setSearchResults, setError } from '../redux/slices/locationsSearchSlice';
import { RootState } from '../redux/stores/locationStore';
import GOOGLE_API_KEY from '../util/const';

const useLocationSearch = () => {
    const dispatch = useDispatch();
    const { searchResults, error } = useSelector((state: RootState) => state.locationsSearch);

    const searchLocations = async (query: string) => {
        try {
            const response = await fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=${GOOGLE_API_KEY}`);
            const data = await response.json();

            if (data.status === 'OK') {
                const results = data.results.map((result: any) => ({
                    latitude: result.geometry.location.lat,
                    longitude: result.geometry.location.lng,
                    name: result.name,
                }));
                dispatch(setSearchResults(results));
            } else {
                dispatch(setError(data.error_message || 'Error fetching locations'));
            }
        } catch (error) {
            dispatch(setError((error as Error).message));
        }
    };

    return { searchResults, error, searchLocations };
};

export default useLocationSearch;