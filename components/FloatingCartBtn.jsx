import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';


export default function FloatingCartButton() {
  const router = useRouter();

  const insets = useSafeAreaInsets();
  const bottomOffset = 80 + insets.bottom;

  const cartItems = useSelector((state) => state.cart);
  const totalCount = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);

  return (
    <TouchableOpacity
      style={[styles.fab, { bottom: bottomOffset }]}
      onPress={() => router.push('/cart')}
    >
      <Ionicons name="cart-outline" size={24} color="#fff" />

      {totalCount > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{totalCount}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    backgroundColor: '#578600',
    borderRadius: 30,
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  badge: {
    position: 'absolute',
    top: -1,
    right: -2,
    backgroundColor: '#578600',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
    borderWidth: 1,
    borderColor: '#578600',
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
