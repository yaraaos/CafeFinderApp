import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function FilterSortBar({
  onSortPress,
  onFilterPress,
  onMapPress,
  filtersActive,
}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onSortPress}>
        <Ionicons name="swap-vertical-outline" size={18} color="#333" style={styles.icon} />
        <Text style={styles.text}>Sort</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={onFilterPress}>
         <Ionicons
          name="options-outline"
          size={18}
          color={filtersActive ? '#578600' : '#333'}
          style={styles.icon}
        />
        <Text style={styles.text}>Filter</Text>
        {filtersActive && <View style={styles.filter} />}
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={onMapPress}>
        <Ionicons name="map-outline" size={18} color="#333" style={styles.icon} />
        <Text style={styles.text}>Map</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    color: '#1f2024',
    fontWeight: 400,
  },
  
  // Filter turns green when pressed on
  filter: {   
    borderRadius: 4,
    backgroundColor: '#578600',
  },
});
