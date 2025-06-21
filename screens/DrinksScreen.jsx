//screen/DrinksScreen.jsx

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


export default function DrinksScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filtersActive, setFiltersActive] = useState(false);
  const [drinks, setDrinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const colors = theme === 'dark' ? darkTheme : lightTheme;


  useEffect(() => {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=coffee')
      .then((res) => res.json())
      .then((data) => {
        const mapped = (data.drinks || []).map((drink) => ({
          id: drink.idDrink,
          name: drink.strDrink,
          image: drink.strDrinkThumb,
          price: 4.99,
        }));
        setDrinks(mapped);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching drinks:', err);
        setLoading(false);
      });
  }, []);

  const handleAddToCart = useCallback((item) => {
    dispatch(addItem(item));
  }, [dispatch]);


  //filter based on search input
  const filteredDrinks = useMemo(() => {
    if (!searchQuery.trim()) return drinks;
    return drinks.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [drinks, searchQuery]);

  if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        <View>
          <Text>Loading drinks...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search for drinks..."
      />

      <FilterSortBar
        onSortPress={() => alert('Sort coming soon')}
        onFilterPress={() => setFiltersActive(!filtersActive)}
        onMapPress={() => {}}
        filtersActive={filtersActive}
      />
      <FlatList
        data={filteredDrinks}
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
