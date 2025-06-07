import React from 'react';
import { Dimensions, Image, Platform, StyleSheet, Text, View } from 'react-native';

const screenHeight = Dimensions.get('window').height;


export default function CafeCard({ cafe }) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: cafe.image }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{cafe.name}</Text>
        <Text style={styles.address}>{cafe.address}</Text>
      </View>
    </View>
  );
}
const CARD_HEIGHT = screenHeight * 0.3; 

const styles = StyleSheet.create({
  card: {
    width: 300,
    height: CARD_HEIGHT,
    borderRadius: 12,
    overflow: 'hidden',
    marginHorizontal: 10,
    backgroundColor: '#fff',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
      },
      android: {
        elevation: 0,
      },
    }),
  },
  image: {
    width: '100%',
    height: '65%',
  },
  textContainer: {
    padding: 12,
    height: '30%',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  address: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});
