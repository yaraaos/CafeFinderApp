// screens/FavoritesScreen.jsx

import { darkTheme, lightTheme } from '@/constants/themeColors';
import { useTheme } from '@/contexts/ThemeContext';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

import CafeCard from '../components/CafeCard';

export default function FavoritesScreen() {
  const favorites = useSelector((state) => state.favorites);
  const { theme } = useTheme();
  const colors = theme === 'dark' ? darkTheme : lightTheme;


  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
        <View style={[styles.container, { backgroundColor: colors.background }]}>
          {favorites.length === 0 ? (
            <View style={styles.emptyContainer}>
                <Text style={[styles.emptyText, { color: colors.text }]}>No favorites yet 🌟</Text>
            </View>
          ) : (
          <>

            <Text style={[styles.header, { color: colors.text }]}>Your Favorites</Text>
            <FlatList
                data={favorites}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContainer}
                renderItem={({ item }) => (
                    <View style={styles.cardWrapper}>
                        <CafeCard cafe={item} />
                    </View>
                )}
            />
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
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
  },
  listContainer: {
    padding: 16,
  },
  cardWrapper: {
    marginBottom: 16,
  },
});
