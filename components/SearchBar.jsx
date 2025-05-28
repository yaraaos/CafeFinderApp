import React from 'react';
import { Platform, StyleSheet, TextInput, View, Text } from 'react-native';

export default function SearchBar({ value, onChangeText, placeholder, helperText }) {
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
      {/* Show helper text when value is empty */}
      {helperText && !value && (
        <Text style={styles.helperText}>{helperText}</Text>
      )}
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
  helperText: {
    marginTop: 4,
    fontSize: 10,
    color: '#666',
    },
});
