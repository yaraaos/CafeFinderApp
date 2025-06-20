//components/filterSortBar.jsx

import { darkTheme, lightTheme } from '@/constants/themeColors';
import { useTheme } from '@/contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';


export default function FilterSortBar({
  onSortPress,
  onFilterPress,
  onMapPress,
  filtersActive,
}) {

  const { theme } = useTheme();
  const colors = theme === 'dark' ? darkTheme : lightTheme;


  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onSortPress}>
        <Ionicons name="swap-vertical-outline" size={18} color={colors.text} style={styles.icon} />
        <Text style={[styles.text, { color: colors.text }]}>Sort</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={onFilterPress}>
         <Ionicons
          name="options-outline"
          size={18}
          // Filter turns green when pressed on
          color={filtersActive ? colors.accent : colors.text}
          style={styles.icon}
        />
        <Text style={[styles.text, { color: colors.text }]}>Filter</Text>
        {filtersActive && <View style={[styles.filter, { backgroundColor: colors.accent }]} />}
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={onMapPress}>
        <Ionicons name="map-outline" size={18} color={colors.text} style={styles.icon} />
        <Text style={[styles.text, { color: colors.text }]}>Map</Text>
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
  icon: {
    marginRight: 6,
  },
  filter: {   
    borderRadius: 4,
  },
});
