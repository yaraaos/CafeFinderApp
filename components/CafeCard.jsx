import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

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

const styles = StyleSheet.create({
  card: {
    width: 300,
    borderRadius: 12,
    overflow: 'hidden',
    marginHorizontal: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 180,
  },
  textContainer: {
    padding: 12,
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
