// components/MainPageBar.jsx
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const categories = ['Cafes', 'Desserts', 'Drinks'];

export default function MainPageBar({ onSelect }) {
  return (
    <View style={styles.container}>
      {categories.map((category) => (
        <TouchableOpacity
          key={category}
          onPress={() => onSelect(category)}
          style={styles.button}
        >
          <Text style={styles.text}>{category}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 12,
    marginBottom: 6,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#eee',
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
  },
});
