// screens/FavoritesScreen.jsx
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import CafeCard from '../components/CafeCard';

export default function FavoritesScreen() {
  const favorites = useSelector((state) => state.favorites);

  if (favorites.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No favorites yet 🌟</Text>
      </View>
    );
  }

  return (
    <SafeAreaView>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
  listContainer: {
    padding: 16,
  },
  cardWrapper: {
    marginBottom: 16,
  },
});
