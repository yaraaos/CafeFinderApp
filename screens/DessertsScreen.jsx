//screen/DessertsScreen.jsx

import { useCallback, useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import ItemsCard from '../components/ItemsCard';
import { addItem } from '../redux/cartSlice';

export default function DessertsScreen() {
  const [desserts, setDesserts] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert')
      .then((res) => res.json())
      .then((data) => {
        const mapped = (data.meals || []).map((meal) => ({
          id: meal.idMeal,
          name: meal.strMeal,
          image: meal.strMealThumb,
          price: 5.49, 
        }));
        setDesserts(mapped);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching desserts:', err);
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
          <Text>Loading desserts...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={desserts}
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
