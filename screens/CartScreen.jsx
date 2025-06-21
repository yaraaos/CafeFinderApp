import { FlatList, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from '../redux/cartSlice';

import { darkTheme, lightTheme } from '@/constants/themeColors';
import { useTheme } from '@/contexts/ThemeContext';


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
  const { theme } = useTheme();
  const colors = theme === 'dark' ? darkTheme : lightTheme;


  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.header, { color: colors.text }]}>Your Cart</Text>
      
      {cart.length === 0 ? (
        <Text style={[styles.empty, { color: colors.text }]}>Your cart is empty.</Text>
      ) : (
        <FlatList
          data={cart}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style>
                <Text style={styles.itemName}>{item.name}</Text>
              </View>

              <View style={styles.controls}>
                <TouchableOpacity onPress={() => handleQuantityChange(item, -1)} style={styles.controlBtn}>
                  <Text style={styles.btnText}>−</Text>
                </TouchableOpacity>

                <Text style={styles.quantity}>{item.quantity}</Text>

                <TouchableOpacity onPress={() => handleQuantityChange(item, 1)} style={styles.controlBtn}>
                  <Text style={styles.btnText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
           )}
         />
        )}
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
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  empty: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 100,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    padding: 12,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 2,
      },
      android: {
        elevation: 0,
      },
    }),
  },
   itemName: {
    fontSize: 16,
    fontWeight: '600',
    paddingVertical: '5',
  },
  controls: { 
    flexDirection: 'row', 
    alignItems: 'center',
  },
  controlBtn: {
    backgroundColor: '#578600',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 4,
    marginHorizontal: 6,
  },
  btnText: { 
    color: '#fff', 
    fontSize: 18,
    fontWeight: 'bold', 
  },
  quantity: { 
    fontSize: 16, 
  },
});
