import React from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem } from '../redux/cartSlice';

export default function CartScreen() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart); // type `any` for now

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Cart</Text>
      
      {cart.length === 0 ? (
        <Text style={styles.empty}>Your cart is empty.</Text>
      ) : (
        <FlatList
          data={cart}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text>{item.name} x{item.quantity}</Text>
              <Button title="Remove" onPress={() => dispatch(removeItem(item.id))} />
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  empty: {
    fontSize: 16,
    color: '#666',
    marginTop: 20,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    padding: 12,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
  },
});
