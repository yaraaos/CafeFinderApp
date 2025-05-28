import React from 'react';
import { Platform, StyleSheet, TextInput, View } from 'react-native';

export default function SearchBar({ value, onChangeText, placeholder }) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder || "Search..."}
        placeholderTextColor={Platform.select({
        ios: '#8E8E93',
        android: '#888',
  })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginTop: 16,
  },
  input: {
    backgroundColor: '#f8f9fe',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 24,
  },
});
