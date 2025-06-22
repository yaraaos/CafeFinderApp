//screens/CafesScreen.jsx
import { darkTheme, lightTheme } from '@/constants/themeColors';
import { useTheme } from '@/contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useCallback, useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import CafeCard from '../components/CafeCard';
import CafeMenuModal from '../components/CafeMenuModal';
import FilterSortBar from '../components/FilterSortBar';
import SearchBar from '../components/SearchBar';

export default function CafesScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filtersActive, setFiltersActive] = useState(false);
  const [selectedCafe, setSelectedCafe] = useState(null);
  
  const { theme } = useTheme();
  const colors = theme === 'dark' ? darkTheme : lightTheme;

  const router = useRouter();

  const stableCafes = useMemo(() => [
    {
      id: '1',
      name: 'Sweeter',
      address: 'вулиця Дарвіна, 1',
      image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93',
      latitude: 49.9935,
      longitude: 36.2304,
    },
    {
      id: '2',
      name: 'Kofein',
      address: 'проспект Науки, 18/9',
      image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24',
      latitude: 50.0078,
      longitude: 36.2337,
    },
    {
      id: '3',
      name: 'Cafefe',
      address: 'проспект Науки',
      image: 'https://images.unsplash.com/photo-1525610553991-2bede1a236e2',
    },
    {
      id: '4',
      name: 'Rivarno Cafe',
      address: 'Салтівка',
      image: 'https://images.unsplash.com/photo-1615322958568-7928d3291f7a',
    },
  ], []);
  const [showSortOptions, setShowSortOptions] = useState(false);
  const [sortOrder, setSortOrder] = useState(null); // 'name-asc' | 'name-desc' | null

  const filteredCafes = useMemo(() => {
  let list = [...stableCafes];

  if (searchQuery.trim()) {
    list = list.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  if (sortOrder === 'name-asc') {
    list.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortOrder === 'name-desc') {
    list.sort((a, b) => b.name.localeCompare(a.name));
  }

    return list;
  }, [stableCafes, searchQuery, sortOrder]);

  const showModal = useCallback((cafe) => {
    setSelectedCafe(cafe);
  }, []);

  const hideModal = useCallback(() => {
    setSelectedCafe(null);
  }, []);



  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search for cafes..."
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
        data={filteredCafes}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={{ width: 196, margin: 6}}>
            <CafeCard cafe={item} onMenuPress={showModal} />
          </View>
        )}
      />

      {/* Menu Modal Window */}
      <CafeMenuModal
        cafe={selectedCafe}
        visible={!!selectedCafe}
        onClose={hideModal}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: 16,
  },
  row: {
    justifyContent: 'space-between',
    paddingHorizontal: 6,
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
