import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Button, FlatList, Text, TouchableOpacity } from 'react-native';
import { Dialog, Portal } from 'react-native-paper';
import useLocationSearch from '../hooks/locationsSearchHook';

interface SearchDialogProps {
    visible: boolean;
    onDismiss: () => void;
    onAddLocation: (location: Location) => void;
}
interface Location {
    latitude: number;
    longitude: number;
    name: string;
}

const SearchDialog: React.FC<SearchDialogProps> = ({ visible, onDismiss, onAddLocation }) => {
    const [query, setQuery] = useState('');
    const { searchResults, error, searchLocations } = useLocationSearch();

    const handleSearch = () => {
        searchLocations(query);
    };

    return (
        <Portal>
            <Dialog visible={visible} onDismiss={onDismiss}>
                <Dialog.Title>Search Locations</Dialog.Title>
                <Dialog.Content>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter location"
                        value={query}
                        onChangeText={setQuery}
                    />
                    <Button title="Search" onPress={handleSearch} />
                    {error && <Text style={styles.errorText}>Error: {error}</Text>}
                    <FlatList
                        data={searchResults}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.resultItem}>
                                <TouchableOpacity onPress={
                                    () => {
                                        onAddLocation(item);
                                        onDismiss()
                                    }
                                }>
                                    <Text>{item.name}</Text>
                                    <Text>{item.latitude}, {item.longitude}</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    />
                </Dialog.Content>
                <Dialog.Actions>
                    <Button title="Close" onPress={onDismiss} />
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
};

const styles = StyleSheet.create({
    input: {
        marginBottom: 10,
        padding: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
    resultItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
});

export default SearchDialog;