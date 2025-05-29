import CafeCard from '@/components/CafeCard';
import CustomButton from '@/components/CustomButton';
import FilterSortBar from '@/components/FilterSortBar';
import SearchBar from '@/components/SearchBar';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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
            image: 'https://unsplash.com/photos/brown-themed-bar-GXXYkSwndP4',
            latitude: 49.9935,
            longitude: 36.2304,
        },
        {
            id: '2',
            name: 'Kofein',
            address: 'проспект Науки, 18/9, Харків',
            image: 'https://unsplash.com/photos/brown-and-gray-concrete-store-nmpW_WwwVSc',
            latitude: 50.0078,
            longitude: 36.2337,
        },
        {
            id: '3',
            name: 'Cafe 3',
            address: 'проспект Науки',
            image: 'https://unsplash.com/photos/a-table-and-chairs-in-a-room-with-a-menu-on-the-wall-gitXsyBIi5s',
            latitude: 50.0081,
            longitude: 36.2378,
        },
        {
            id: '4',
            name: 'Cafe 4',
            address: 'Салтівка',
            image: 'https://unsplash.com/photos/brown-wooden-table-and-chairs-xhKG01FN2uk',
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
          <Text style={styles.title}>Nearby Cafes</ Text>
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

  bottomContainer : {
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 16,
    marginBottom: 10,
  },
  scrollContainer: {
    paddingLeft: 16,
    paddingRight: 8,
  },
});