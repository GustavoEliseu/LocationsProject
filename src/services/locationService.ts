import Geolocation from 'react-native-geolocation-service';
import { AppDispatch } from '../redux/stores/locationStore';
import { setLocation, setLocationError } from '../redux/slices/locationSlice';
import { PermissionsAndroid } from 'react-native';

let watchId: number | null = null;

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