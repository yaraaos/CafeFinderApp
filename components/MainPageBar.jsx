import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

// Suggestion items — can be expanded later if needed
const suggestions = ['Cafes', 'Drinks', 'Desserts'];

export default function MainPageBar({ onSelect }) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      <View style={styles.container}>
        {suggestions.map((item) => (
          <TouchableOpacity
            key={item}
            style={styles.chip}
            onPress={() => onSelect(item)}
          >
            <Text style={styles.chipText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: 16,
  },
  container: {
    flexDirection: 'row',
    gap: 12,
  },
  chip: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  chipText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
});
