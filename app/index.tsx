import CafeCard from '@/components/CafeCard';
import CustomButton from '@/components/CustomButton';
import FilterSortBar from '@/components/FilterSortBar';
import SearchBar from '@/components/SearchBar';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const screenHeight = Dimensions.get('window').height;

/*
export default function Index() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.text}>Main menu</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 22,
    lineHeight: 100,
    color: 'blue',
  }
})
*/

export default function HomeScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [filtersActive, setFiltersActive] = useState(false);

  const handleSort = () => {
    alert('Sort pressed!');
  };

  const handleFilter = () => {
    setFiltersActive(!filtersActive);
    alert('Filter added!');
  };

  const handleMap = () => {
    router.push('/map');
  };

  const handleOrder = () => {
    alert('Checking out!');
  };
      //cafe data
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
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="What would you like to drink?"
            helperText="Try searching for drinks like Latte, Matcha..."
          />
          <FilterSortBar
            onSortPress={handleSort}
            onFilterPress={handleFilter}
            onMapPress={handleMap}
            filtersActive={filtersActive}
          />
          
          {/* Scrollable Cafe Cards */}
          <View style={styles.cardsContainer}>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContainer}
              >
                {cafes.map(cafe => (
                  <CafeCard key={cafe.id} cafe={cafe} />
                ))}
              </ScrollView>
          </View>
        </View>

        <View style={styles.bottomContainer}>
          <CustomButton text="Checkout" color="#578600" onPress={handleOrder} />
        </View>
      </View>
    </SafeAreaView>
    );
  }

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  container: {
    flex: 1,
  },

  topContainer: {
    flex: 1,
    gap: 19,
  },

  cardsContainer: {
    marginTop: 16,
  },

  scrollContainer: {
    paddingLeft: 16,
    paddingRight: 8,
  },

  bottomContainer : {
    padding: 24,
  },
});