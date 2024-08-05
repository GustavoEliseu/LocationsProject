import React, { RefObject, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { startLocationService, stopLocationService } from '../services/locationService';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import FAB from '../util/FAB';
import userMapLocationHook from '../hooks/userMapLocationHook';
import SearchDialog from './newLocationsDialog';
import { loadLocations, saveLocations } from '../services/locationsStorage';


const lat = -3.71839;
const lon = -38.5434;
const LocationComponent: React.FC = () => {
    const dispatch = useDispatch();
    const { mapRef, isLocationSet, zoomLevel, handleZoomIn, handleZoomOut, error } = userMapLocationHook();
    const [isDialogVisible, setDialogVisible] = useState(false);
    const [locations, setLocations] = useState<Array<{ latitude: number; longitude: number; name: string }>>([])

    useEffect(() => {
        const fetchLocations = async () => {
            const savedLocations = await loadLocations();
            setLocations(savedLocations);
        };
        fetchLocations();
    }, []);

    useEffect(() => {
        startLocationService(dispatch);

        return () => {
            stopLocationService();
        };
    }, [dispatch]);


    return (
        <View style={styles.container}>
            {error ? (
                <Text style={styles.errorText}>Error: {error}</Text>
            ) : (
                <>
                    {isLocationSet ? (
                        <>
                            <MapView
                                ref={mapRef}
                                provider={PROVIDER_GOOGLE}
                                style={styles.map}
                                initialRegion={{
                                    latitude: lat,
                                    longitude: lon,
                                    latitudeDelta: zoomLevel,
                                    longitudeDelta: zoomLevel,
                                }}
                                showsUserLocation={true}
                            >
                                {locations.map((location, index) => (
                                    <Marker
                                        key={index}
                                        coordinate={{ latitude: location.latitude, longitude: location.longitude }}
                                        title={location.name}
                                    />
                                ))}
                            </MapView>
                            <View style={styles.zoomControls}>
                                <TouchableOpacity onPress={handleZoomIn} style={styles.zoomButton}>
                                    <Text style={styles.zoomText}>+</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={handleZoomOut} style={styles.zoomButton}>
                                    <Text style={styles.zoomText}>-</Text>
                                </TouchableOpacity>
                            </View>
                            <FAB title='add' onPress={() => { if (!isDialogVisible) setDialogVisible(true) }} />

                        </>
                    ) : (
                        <Text style={styles.text}>Esperando localização...</Text>)}
                    <SearchDialog
                        visible={isDialogVisible}
                        onDismiss={function (): void {
                            setDialogVisible(false)
                        }}
                        onAddLocation={function (location): void {
                            locations.push(location)
                            saveLocations(locations)
                            console.log(locations)
                            ToastAndroid.show(location.name, ToastAndroid.SHORT)
                        }} />
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    text: {
        fontSize: 18,
        marginVertical: 8,
    },
    zoomControls: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 10,
        padding: 5,
    },
    zoomButton: {
        padding: 10,
        alignItems: 'center',
        borderRadius: 5,
        margin: 5,
    },
    zoomText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    errorText: {
        fontSize: 18,
        color: 'red',
    },
});

export default LocationComponent;