import { FlatList, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from '../redux/cartSlice';

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
                        <Text style={styles.btnText}>−</Text>
                      </TouchableOpacity>

                      <Text style={[styles.quantity, { color: colors.text }]}>{item.quantity}</Text>

                      <TouchableOpacity onPress={() => handleQuantityChange(item, 1)} style={styles.controlBtn}>
                        <Text style={styles.btnText}>+</Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  <Text style={[styles.price, { color: colors.text }]}>€ {item.price.toFixed(2)}</Text>
                </View>
              )}
            />

            <View style={styles.totalWrapper}>
              <Text style={[styles.totalText, { color: colors.text }]}>Total</Text>
              <Text style={[styles.totalText, { color: colors.text }]}>€ {total.toFixed(2)}</Text>
            </View>

            <TouchableOpacity style={styles.checkoutBtn} onPress={() => alert('Checkout')}>
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
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  controlBtn: {
    backgroundColor: '#578600',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
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
  price: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
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
