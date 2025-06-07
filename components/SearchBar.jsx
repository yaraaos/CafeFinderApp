import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Dimensions, FlatList, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const MAX_WIDTH = SCREEN_WIDTH > 600 ? 600 : SCREEN_WIDTH * 0.9;

const suggestionsList = ['Coffee', 'Cappuccino', 'Cafe Latte', 'Caramel Macchiato', 'Croissant', 'Cheesecake', 'Matcha', 'Matcha Latte'];

export default function SearchBar({ value, onChangeText, placeholder }) {
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  const handleInputChange = (text) => {
    onChangeText(text);
    const filtered = suggestionsList.filter(item =>
      item.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredSuggestions(text ? filtered : []);
  };

  const handleSuggestionPress = (suggestion) => {
    onChangeText(suggestion);
    setFilteredSuggestions([]); // Clear suggestions after selecting
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <Ionicons name="search-outline" size={20} color="#8E8E93" style={styles.icon} />
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={handleInputChange}
          placeholder={placeholder || "Search..."}
          placeholderTextColor={Platform.select({
            ios: '#8E8E93',
            android: '#888',
          })}
        />
      </View>
      
      {/* Show helper text when value is empty */}
      {filteredSuggestions.length > 0 && (
        <FlatList
          data={filteredSuggestions}
          keyExtractor={(item, index) => index.toString()}
          style={styles.suggestionsList}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleSuggestionPress(item)} style={styles.suggestionItem}>
              <Text>{item}</Text>
            </TouchableOpacity>
          )}
        />
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
  
  suggestionsList: {
    width: '100%',
    maxWidth: MAX_WIDTH,
    marginTop: 4,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  suggestionItem: {
    paddingVertical: 8,
    borderBottomColor: '#ddd',
  },
});
