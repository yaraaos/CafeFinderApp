//screen/DrinksScreen.jsx

import { useCallback, useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import ItemsCard from '../components/ItemsCard';
import { addItem } from '../redux/cartSlice';

export default function DrinksScreen() {
  const [drinks, setDrinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=coffee')
      .then((res) => res.json())
      .then((data) => {
        const mapped = (data.drinks || []).map((drink) => ({
          id: drink.idDrink,
          name: drink.strDrink,
          image: drink.strDrinkThumb,
          price: 4.99,
        }));
        setDrinks(mapped);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching drinks:', err);
        setLoading(false);
      });
  }, []);

  const handleAddToCart = useCallback((item) => {
    dispatch(addItem(item));
  }, [dispatch]);

  if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        <View>
          <Text>Loading drinks...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={drinks}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <ItemsCard item={item} onAddToCart={handleAddToCart} />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: 16,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
});
