//screen/DessertsScreen.jsx

import { darkTheme, lightTheme } from '@/constants/themeColors';
import { useTheme } from '@/contexts/ThemeContext';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';

import FilterSortBar from '../components/FilterSortBar';
import ItemsCard from '../components/ItemsCard';
import SearchBar from '../components/SearchBar';
import { addItem } from '../redux/cartSlice';

export default function DessertsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filtersActive, setFiltersActive] = useState(false);
  const [desserts, setDesserts] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const colors = theme === 'dark' ? darkTheme : lightTheme;


  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert')
      .then((res) => res.json())
      .then((data) => {
        const mapped = (data.meals || []).map((meal) => ({
          id: meal.idMeal,
          name: meal.strMeal,
          image: meal.strMealThumb,
          price: parseFloat((Math.random() * 4 + 2).toFixed(2)) 
        }));
        setDesserts(mapped);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching desserts:', err);
        setLoading(false);
      });
  }, []);

  const handleAddToCart = useCallback((item) => {
    dispatch(addItem(item));
  }, [dispatch]);

    //filter based on search input
  const filteredDesserts = useMemo(() => {
      if (!searchQuery.trim()) return desserts;
      return desserts.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
  }, [desserts, searchQuery]);

  if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        <View>
          <Text>Loading desserts...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search for desserts..."
      />

      <FilterSortBar
        onSortPress={() => alert('Sort coming soon')}
        onFilterPress={() => setFiltersActive(!filtersActive)}
        onMapPress={() => {}}
        filtersActive={filtersActive}
      />        
      <FlatList
        data={filteredDesserts}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <ItemsCard item={item} onAddToCart={handleAddToCart} />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: 16,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
});
