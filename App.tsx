
import type { PropsWithChildren } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import MapScreen from './src/components/MapScreen';
import { Provider } from 'react-redux';
import locationStore from './src/redux/stores/locationStore';
import { PaperProvider } from 'react-native-paper';



function App(): React.JSX.Element {
  return (
    <Provider store={locationStore} >
      <PaperProvider>
        <View style={styles.container}>
          <MapScreen />
        </View>
      </PaperProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },

});

export default App;
