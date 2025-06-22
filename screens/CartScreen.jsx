import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { FlatList, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, removeItem, updateQuantity } from '../redux/cartSlice';
import { addOrders } from '../redux/lastOrdersSlice';

import { darkTheme, lightTheme } from '@/constants/themeColors';
import { useTheme } from '@/contexts/ThemeContext';

export default function CartScreen() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart || []);
  const total = cart.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0);

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
          <>
           {/*ITEMS IN CART*/}
            <FlatList
              data={cart}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 24 }}
              renderItem={({ item }) => (
                <View style={[styles.itemRow, { backgroundColor: colors.card || '#fff' }]}>
                  <Image source={{ uri: item.image }} style={styles.itemImage} />

                  <View style={styles.itemDetails}>
                    <Text style={[styles.itemName, { color: colors.text }]}>{item.name}</Text>

                    <View style={styles.controls}>
                      <TouchableOpacity onPress={() => handleQuantityChange(item, -1)} style={styles.controlBtn}>
                        <Ionicons name="remove" size={18} color="#578600" />
                      </TouchableOpacity>

                      <Text style={[styles.quantity, { color: colors.text }]}>{item.quantity}</Text>

                      <TouchableOpacity onPress={() => handleQuantityChange(item, 1)} style={styles.controlBtn}>
                        <Ionicons name="add" size={18} color="#578600" />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <Text style={[styles.price, { color: colors.text }]}>€ {item.price.toFixed(2)}</Text>
                </View>
              )}
            />
            {/*TOTAL*/}
            <View style={styles.totalWrapper}>
              <Text style={[styles.totalText, { color: colors.text }]}>Total</Text>
              <Text style={[styles.totalText, { color: colors.text }]}>€ {total.toFixed(2)}</Text>
            </View>

            {/*CHECKOUT BUTTON*/}
            <TouchableOpacity 
              style={styles.checkoutBtn} 
              onPress={() => {
                dispatch(addOrders(cart));
                dispatch(clearCart());
                router.push('/thankyou');
              }}>
              <Text style={styles.checkoutBtnText}>Checkout</Text>
            </TouchableOpacity>
          </>
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
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginBottom: 12,
    borderRadius: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 2,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  itemImage: {
    width: 90,
    height: 100,
    borderRadius: 10,
    marginRight: 12,
  },
  itemDetails: {
    flex: 1,
    justifyContent: 'space-between',
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 7,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 18,
  },
  controlBtn: {
    backgroundColor: 'rgba(87, 134, 0, 0.2)',
    width: 28,
    height: 28,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  quantity: {
    fontSize: 16,
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
    marginTop: 45,
  },
  totalWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  checkoutBtn: {
    backgroundColor: '#578600',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 24,
  },
  checkoutBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
