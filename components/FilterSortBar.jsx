import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function FilterSortBar({
  onSortPress,
  onFilterPress,
  onMapPress,
  filtersActive,
}) {
    const router = useRouter();
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onSortPress}>
        <Text style={styles.text}>Sort</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={onFilterPress}>
        <Text style={styles.text}>Filter</Text>
        {filtersActive && <View style={styles.dot} />}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/map')}>
        <Text>Map</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,
    backgroundColor: '#E3FFE3',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 14,
    color: '#1f2024',
    fontWeight: 400,
  },
  
  // Green dot on filter
  dot: {               
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#578600', 
    marginLeft: 6,
  },
});
