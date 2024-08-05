import AsyncStorage from '@react-native-async-storage/async-storage';

const LOCATIONS_KEY = 'locations_key';
const TIMESTAMP_KEY = 'timestamp_key';

export const saveLocations = async (locations: Array<{ latitude: number; longitude: number; name: string }>) => {
    try {
        const jsonValue = JSON.stringify(locations);
        await AsyncStorage.setItem(LOCATIONS_KEY, jsonValue);
        await AsyncStorage.setItem(TIMESTAMP_KEY, new Date().toISOString());
    } catch (e) {
        console.error('Falha ao salvar locais:', e);
    }
};

export const loadLocations = async (): Promise<Array<{ latitude: number; longitude: number; name: string }>> => {
    try {
        const jsonValue = await AsyncStorage.getItem(LOCATIONS_KEY);
        return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
        console.error('falha ao carregar locais:', e);
        return [];
    }
};

export const getLastUpdateTimestamp = async (): Promise<string | null> => {
    try {
        return await AsyncStorage.getItem(TIMESTAMP_KEY);
    } catch (e) {
        console.error('Falha ao verificar o timestamp:', e);
        return null;
    }
};