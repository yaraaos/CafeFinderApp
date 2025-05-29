import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import * as Location from 'expo-location';
import MapComponent from '../components/MapComponent';

export default function MapScreen() {
    const [userLocation, setUserLocation] = useState(null);

    const cafes = [
        {
            id: '1',
            name: 'Sweeter',
            address: 'вулиця Дарвіна, 1, Харків',
            latitude: 49.9935,
            longitude: 36.2304,
        },
        {
            id: '2',
            name: 'Kofein',
            address: 'проспект Науки, 18/9, Харків',
            latitude: 50.0078,
            longitude: 36.2337,
        },
    ];

    useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'We need your location to show the map.');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setUserLocation(location.coords);
    })();
  }, []);

  return (
    <View style={styles.container}>
      {userLocation ? (
        <MapComponent cafes={cafes} userLocation={userLocation} />
      ) : (
        <Text style={styles.loadingText}>Loading your location...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingText: {
    marginTop: 50,
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
  },
});

