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
            image: 'https://unsplash.com/photos/brown-themed-bar-GXXYkSwndP4',
            latitude: 49.9935,
            longitude: 36.2304,
        },
        {
            id: '2',
            name: 'Kofein',
            address: 'проспект Науки, 18/9, Харків',
            image: 'https://unsplash.com/photos/brown-and-gray-concrete-store-nmpW_WwwVSc',
            latitude: 50.0078,
            longitude: 36.2337,
        },
        {
            id: '3',
            name: 'Cafe 3',
            address: 'проспект Науки',
            image: 'https://unsplash.com/photos/a-table-and-chairs-in-a-room-with-a-menu-on-the-wall-gitXsyBIi5s',
            latitude: 50.0081,
            longitude: 36.2378,
        },
        {
            id: '4',
            name: 'Cafe 4',
            address: 'Салтівка',
            image: 'https://unsplash.com/photos/brown-wooden-table-and-chairs-xhKG01FN2uk',
            latitude: 50.0090,
            longitude: 36.2322,
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

