import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MapView, { Region } from 'react-native-maps';
import { RootState } from '../redux/stores/locationStore';
import { startLocationService, stopLocationService } from '../services/locationService';


let isLocationSet = false
const userMapLocationHook = () => {
    const dispatch = useDispatch();
    const mapRef = useRef<MapView>(null);
    const [zoomLevel, setZoomLevel] = useState(0.0922);
    const { latitude, longitude, error } = useSelector((state: RootState) => {
        lat = state.location.latitude ?? lat;
        lon = state.location.longitude ?? lon;
        if (state.location)
            isLocationSet = true
        return state.location
    });
    let lat = latitude ?? -3.71839;
    let lon = longitude ?? -38.5434;


    useEffect(() => {
        startLocationService(dispatch);

        return () => {
            stopLocationService();
        };
    }, [dispatch]);

    useEffect(() => {
        if (latitude !== null && longitude !== null && mapRef.current) {
            updatePosition()
        }
    }, [latitude, longitude, zoomLevel]);

    const updatePosition = (newZoom: number = zoomLevel) => {
        if (mapRef.current) {
            mapRef.current.animateToRegion({
                latitude: lat,
                longitude: lon,
                latitudeDelta: newZoom,
                longitudeDelta: newZoom,
            });
        }
    }

    const handleZoomIn = () => {
        setZoomLevel(prevZoom => {
            const newZoom = Math.max(prevZoom - 0.008, 0.001);
            updatePosition(newZoom);
            return newZoom;
        });
    };

    const handleZoomOut = () => {
        setZoomLevel(prevZoom => {
            const newZoom = Math.min(prevZoom + 0.008, 0.6);
            updatePosition(newZoom)
            return newZoom;
        });
    };

    return { mapRef, isLocationSet, zoomLevel, handleZoomIn, handleZoomOut, error };
};



export default userMapLocationHook;