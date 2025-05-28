import { StyleSheet, View } from 'react-native';
import MapComponent from '../components/MapComponent';

export default function MapScreen() {
  const cafes = [
    { id: '1', name: 'Cafe One', latitude: 37.78825, longitude: -122.4324 },
    { id: '2', name: 'Cafe Two', latitude: 37.78925, longitude: -122.4334 },
  ];

  const userLocation = { latitude: 37.78825, longitude: -122.4324 };

  return (
    <View style={styles.container}>
      <MapComponent cafes={cafes} userLocation={userLocation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

