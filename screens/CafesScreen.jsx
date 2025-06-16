import { darkTheme, lightTheme } from '@/constants/themeColors';
import { useTheme } from '@/contexts/ThemeContext';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Dimensions, FlatList, StyleSheet, View } from 'react-native';
import {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import CafeMenuModal from '../components//CafeMenuModal';
import CafeCard from '../components/CafeCard';
import FilterSortBar from '../components/FilterSortBar';
import SearchBar from '../components/SearchBar';


export default function CafesScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [filtersActive, setFiltersActive] = useState(false);
  const [selectedCafe, setSelectedCafe] = useState(null);

  const { theme } = useTheme();
  const colors = theme === 'dark' ? darkTheme : lightTheme;

  const modalOpacity = useSharedValue(0);
  const modalTranslate = useSharedValue(100);

  const screenWidth = Dimensions.get('window').width;
  const CARD_SPACING = screenWidth * 0.8;

  const showModal = (cafe) => {
    setSelectedCafe(cafe);
    modalOpacity.value = withTiming(1);
    modalTranslate.value = withTiming(0);
  };

  const hideModal = () => {
    modalOpacity.value = withTiming(0);
    modalTranslate.value = withTiming(100, {}, () => {
      runOnJS(setSelectedCafe)(null);
    });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: modalOpacity.value,
    transform: [{ translateY: modalTranslate.value }],
  }));

  const cafes = [
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
      image: 'https://images.unsplash.com/photo-1525610553991-2bede1a236e2?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      latitude: 50.0081,
      longitude: 36.2378,
    },
    {
      id: '4',
      name: 'Rivarno Cafe',
      address: 'Салтівка',
      image: 'https://images.unsplash.com/photo-1615322958568-7928d3291f7a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nzd8fGNhZmV8ZW58MHx8MHx8fDA%3D',
      latitude: 50.0090,
      longitude: 36.2322,
    },
  ];


  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search for cafes..."
        />

        <FilterSortBar
          onSortPress={() => alert('Sort')}
          onFilterPress={() => setFiltersActive (!filtersActive)}
          onMapPress={() => router.push('/map')}
          filtersActive={filtersActive}
        />

        <FlatList
          data={cafes}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={{ paddingBottom: 24 }}
          ItemSeparatorComponent={() => <View style={{  width: CARD_SPACING }} />}
          renderItem={({ item }) => (
            <View style={styles.cardWrapper}>
              <CafeCard cafe={item} onMenuPress={showModal} />
            </View>
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>

      {/* Menu Modal Window */}
      <CafeMenuModal
        cafe={selectedCafe}
        visible={!!selectedCafe}
        onClose={() => setSelectedCafe(null)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },

  cardsContainer: {
    gap: 16,
  },
  cardWrapper: {
    flex:1,
    marginBottom: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: '#000000aa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  modalText: {
    fontSize: 16,
    color: '#444',
  },
  closeButton: {
    marginTop: 20,
    fontSize: 16,
    color: '#ff914d',
    fontWeight: '600',
  },
});
