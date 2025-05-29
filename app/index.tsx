import { useRouter } from 'expo-router';
import CustomButton from '@/components/CustomButton';
import FilterSortBar from '@/components/FilterSortBar';
import SearchBar from '@/components/SearchBar';
import React, { useState } from 'react';
import { StyleSheet, View } from "react-native";
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
});