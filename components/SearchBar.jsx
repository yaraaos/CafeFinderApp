import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Dimensions, Platform, StyleSheet, Text, TextInput, View } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const MAX_WIDTH = SCREEN_WIDTH > 600 ? 600 : SCREEN_WIDTH * 0.9;

export default function SearchBar({ value, onChangeText, placeholder, helperText }) {
  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <Ionicons name="search-outline" size={20} color="#8E8E93" style={styles.icon} />
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
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fe',
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === 'ios' ? 12 : 0,
    borderRadius: 24,
    width: '100%',
    maxWidth: MAX_WIDTH,
  },

  icon: {
    marginRight: 8,
  },

  input: {
    flex: 1,
    fontSize: 15,
    color: '#333',
  },
  helperText: {
    marginTop: 4,
    fontSize: 10,
    color: '#666',
    },
});
