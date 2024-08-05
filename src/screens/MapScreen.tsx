import React, { RefObject, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/locationStore';
import { startLocationService, stopLocationService } from '../service/locationService';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import FAB from '../util/FAB';
import userMapLocationHook from '../hooks/userMapLocationHook';

const LocationComponent: React.FC = () => {
    const dispatch = useDispatch();
    const { mapRef, isLocationSet, zoomLevel, handleZoomIn, handleZoomOut, error } = userMapLocationHook();

    useEffect(() => {
        startLocationService(dispatch);

        return () => {
            stopLocationService();
        };
    }, [dispatch]);

    let lat = 37.78825;
    let lon = -122.4324;
    console.log(isLocationSet)

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
                            />
                            <View style={styles.zoomControls}>
                                <TouchableOpacity onPress={handleZoomIn} style={styles.zoomButton}>
                                    <Text style={styles.zoomText}>+</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={handleZoomOut} style={styles.zoomButton}>
                                    <Text style={styles.zoomText}>-</Text>
                                </TouchableOpacity>
                            </View>
                            <FAB title='add' onPress={() => { ToastAndroid.show("Clicou", ToastAndroid.SHORT) }} />
                        </>
                    ) : (
                        <Text style={styles.text}>Esperando localização...</Text>)}
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