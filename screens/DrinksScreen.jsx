//screen/DrinksScreen.jsx

import { darkTheme, lightTheme } from '@/constants/themeColors';
import { useTheme } from '@/contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';

import FilterSortBar from '../components/FilterSortBar';
import ItemsCard from '../components/ItemsCard';
import SearchBar from '../components/SearchBar';
import { addItem } from '../redux/cartSlice';


export default function DrinksScreen() {
  const router = useRouter();
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
          price: parseFloat((Math.random() * 4 + 2).toFixed(2)),
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

  const [showSortOptions, setShowSortOptions] = useState(false);
  const [sortOrder, setSortOrder] = useState(null); // 'asc' or 'desc'

  const filteredAndSortedDrinks = useMemo(() => {
    let result = [...drinks];

    if (searchQuery.trim()) {
      result = result.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (sortOrder === 'asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOrder === 'name-asc') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOrder === 'name-desc') {
      result.sort((a, b) => b.name.localeCompare(a.name));
    } 

    return result;
  }, [drinks, searchQuery, sortOrder]);

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
        onSortPress={() => setShowSortOptions((prev) => !prev)}
        onFilterPress={() => setFiltersActive(!filtersActive)}
        onMapPress={() => router.push('/map')}
        filtersActive={filtersActive}
      />
      {showSortOptions && (
          <View style={styles.sortDropdown}>
            <TouchableOpacity
              onPress={() => {
                setSortOrder('asc');
                setShowSortOptions(false);
              }}
              style={styles.sortOption}
            >
              <Ionicons name="arrow-up-outline" size={16} style={styles.icon} />
              <Text style={{ color: colors.text }}>Price: Low to High</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setSortOrder('desc');
                setShowSortOptions(false);
              }}
              style={styles.sortOption}
            >
              <Ionicons name="arrow-down-outline" size={16} style={styles.icon} />
              <Text style={{ color: colors.text }}>Price: High to Low</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setSortOrder('name-asc');
                setShowSortOptions(false);
              }}
              style={styles.sortOption}
            >
              <Ionicons name="arrow-up-outline" size={16} style={styles.icon} />
              <Text style={{ color: colors.text }}>Name: A to Z</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setSortOrder('name-desc');
                setShowSortOptions(false);
              }}
              style={styles.sortOption}
            >
              <Ionicons name="arrow-down-outline" size={16} style={styles.icon} />
              <Text style={{ color: colors.text }}>Name: Z to A</Text>
            </TouchableOpacity>

          </View>
        )}
      <FlatList
        data={filteredAndSortedDrinks}
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
  sortDropdown: {
    position: 'absolute',
    top: 155,
    left: 16,
    right: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    zIndex: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 3,
  },
  sortOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  icon: {
    marginRight: 8,
  },
});
