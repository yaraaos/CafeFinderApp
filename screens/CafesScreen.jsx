import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import CafeCard from '../components/CafeCard';
import SearchBar from '../components/SearchBar';
import FilterSortBar from '../components/FilterSortBar';

export default function CafesScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [filtersActive, setFiltersActive] = useState(false);

  const cafes = [
    {
      id: '1',
      name: 'Sweeter',
      address: 'вулиця Дарвіна, 1, Харків',
      image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93',
      latitude: 49.9935,
      longitude: 36.2304,
    },
    {
      id: '2',
      name: 'Kofein',
      address: 'проспект Науки, 18/9, Харків',
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
    <ScrollView style={styles.container}>
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search for cafes..."
      />

      <FilterSortBar
        onSortPress={() => alert('Sort')}
        onFilterPress={() => setFiltersActive(!filtersActive)}
        onMapPress={() => router.push('/map')}
        filtersActive={filtersActive}
      />

      <Text style={styles.sectionTitle}>All Cafes</Text>
      <View style={styles.cardsContainer}>
        {cafes.map((cafe) => (
          <View key={cafe.id} style={styles.cardWrapper}>
            <CafeCard cafe={cafe} />
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 16,
  },
  cardsContainer: {
    gap: 16,
  },
  cardWrapper: {
    marginBottom: 16,
  },
});
