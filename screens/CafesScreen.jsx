//screens/CafesScreen.jsx
import { darkTheme, lightTheme } from '@/constants/themeColors';
import { useTheme } from '@/contexts/ThemeContext';

import { useRouter } from 'expo-router';
import { useCallback, useMemo, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
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

  const filteredCafes = useMemo(() => {
    if (!searchQuery.trim()) return stableCafes;
    return stableCafes.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [stableCafes, searchQuery]);

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
        onSortPress={() => alert('Sort coming soon')}
        onFilterPress={() => setFiltersActive(!filtersActive)}
        onMapPress={() => router.push('/map')}
        filtersActive={filtersActive}
      />

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
});
