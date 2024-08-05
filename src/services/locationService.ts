import Geolocation from 'react-native-geolocation-service';
import { AppDispatch } from '../redux/stores/locationStore';
import { setLocation, setLocationError } from '../redux/slices/locationSlice';
import { PermissionsAndroid, ToastAndroid } from 'react-native';
import { getLastUpdateTimestamp, loadLocations, saveLocations } from './locationsStorage';
import { haversineDistance } from '../util/distanceCalculation';

let watchId: number | null = null;

let lastCheckedTimestamp: string | null = null;
let lastPosition: Geolocation.GeoPosition | null = null
let locations: Location[]

interface Location {
    latitude: number;
    longitude: number;
    name: string;
    shownNotification: boolean;
}

export const fetchLocationsIfUpdated = async () => {
    try {
        const currentTimestamp = await getLastUpdateTimestamp();
        if (currentTimestamp && currentTimestamp !== lastCheckedTimestamp) {
            const tempLocations = await loadLocations();
            lastCheckedTimestamp = currentTimestamp;
            if (tempLocations != undefined) {
                locations = tempLocations.map(location => ({
                    ...location,
                    shownNotification: false
                }));
            }
            return tempLocations;
        } else {
            return locations
        }
    } catch (e) {
        console.error('Failed to fetch locations:', e);
    }
};

const requestLocationPermission = async () => {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title: 'Location Permission',
                message: 'This app needs access to your location.',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
            }
        );

        return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
        console.warn(err);
        return false;
    }
};

export const startLocationService = (dispatch: AppDispatch) => {
    requestLocationPermission().then((hasPermission) => {
        if (hasPermission) {
            watchId = Geolocation.watchPosition(
                (position) => {
                    if (position != lastPosition) {
                        if (lastPosition && haversineDistance(lastPosition.coords.latitude, lastPosition.coords.longitude, position.coords.latitude, position.coords.longitude) > 150) {
                            fetchLocationsIfUpdated()
                            if (locations) {
                                locations.forEach((location, index) => {
                                    if (!location.shownNotification && haversineDistance(location.latitude, location.longitude, position.coords.latitude, position.coords.longitude) < 300) {
                                        locations[index].shownNotification = true
                                        saveLocations(locations)
                                        ToastAndroid.showWithGravity("ta perto", ToastAndroid.SHORT, ToastAndroid.TOP)
                                    }
                                    position
                                })
                            }
                        }
                        lastPosition = position;
                    }
                    dispatch(setLocation({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    }));
                },
                (error) => {
                    dispatch(setLocationError(error.message));
                },
                {
                    enableHighAccuracy: true,
                    distanceFilter: 10,
                    interval: 10000,
                    fastestInterval: 5000,
                }
            );
        } else {
            dispatch(setLocationError("Location permission denied."));
        }
    });
};

export const stopLocationService = () => {
    if (watchId !== null) {
        Geolocation.clearWatch(watchId);
        watchId = null;
    }
};