import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from '../redux/cartSlice';

export default function CartScreen() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const handleQuantityChange = (item, delta) => {
    const newQuantity = item.quantity + delta;

    if (newQuantity <= 0) {
      dispatch(removeItem(item.id));
    } else {
      dispatch(updateQuantity({ id: item.id, quantity: newQuantity }));
    }
  };

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
              <Text style={styles.itemText}>{item.name}</Text>

              <View style={styles.controls}>
                <TouchableOpacity onPress={() => handleQuantityChange(item, -1)} style={styles.btn}>
                  <Text style={styles.btnText}>−</Text>
                </TouchableOpacity>

                <Text style={styles.qty}>{item.quantity}</Text>

                <TouchableOpacity onPress={() => handleQuantityChange(item, 1)} style={styles.btn}>
                  <Text style={styles.btnText}>+</Text>
                </TouchableOpacity>
              </View>
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
  itemText:{
    fontSize: 16,
  },
  controls: { 
    flexDirection: 'row', 
    alignItems: 'center' 
  },
  btn: {
    backgroundColor: '#578600',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 4,
    marginHorizontal: 6,
  },
  btnText: { 
    color: '#fff', 
    fontSize: 18 
  },
  qty: { 
    fontSize: 16 
  },
});
