// screens/FavoritesScreen.jsx

import { darkTheme, lightTheme } from '@/constants/themeColors';
import { useTheme } from '@/contexts/ThemeContext';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';

import { useCallback, useState } from 'react';
import CafeCard from '../components/CafeCard';
import CafeMenuModal from '../components/CafeMenuModal';
import ItemsCard from '../components/ItemsCard';
import { addItem } from '../redux/cartSlice';


export default function FavoritesScreen() {
  const favorites = useSelector((state) => state.favorites || []);
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const colors = theme === 'dark' ? darkTheme : lightTheme;

  const favoriteCafes = favorites.filter(item => item.address);
  const favoriteProducts = favorites.filter(item => !item.address);
  const [selectedCafe, setSelectedCafe] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const showModal = useCallback((cafe) => {
    setSelectedCafe(cafe);
    setModalVisible(true);
  }, []);

  const hideModal = useCallback(() => {
    setModalVisible(false);
  }, []);


  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        {favorites.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, { color: colors.text }]}>No favorites yet 🌟</Text>
          </View>
        ) : (
          <>
            {/* Favorite Cafes */}
            {favoriteCafes.length > 0 && (
              <>
                <Text style={[styles.header, { color: colors.text }]}>Favorite Cafes</Text>
                <FlatList
                  data={favoriteCafes}
                  keyExtractor={(item) => item.id}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.horizontalList}
                  ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
                  renderItem={({ item }) => (
                    <View style={styles.cardWrapper}>
                      <CafeCard cafe={item} onMenuPress={showModal} />
                    </View>
                  )}
                />
              </>
            )}

            {/* Favorite Products */}
            {favoriteProducts.length > 0 && (
              <>
                <Text style={[styles.header, { color: colors.text, }]}>Favorite Products</Text>
                <FlatList
                  data={favoriteProducts}
                  keyExtractor={(item) => item.id}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.horizontalList}
                  ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
                  renderItem={({ item }) => (
                    <ItemsCard item={item} onAddToCart={() => dispatch(addItem(item))} />
                  )}
                />
                <CafeMenuModal
                  cafe={selectedCafe}
                  visible={modalVisible}
                  onClose={hideModal}
                />
              </>
            )}
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: 16,
  },
  container: {
    flex: 1,
    paddingTop: 24,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    paddingHorizontal: 12,
  },
  emptyText: {
    fontSize: 16,
  },
  horizontalList: {
    paddingLeft: 12,
    paddingBottom: 8,
  },
});
