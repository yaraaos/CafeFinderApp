import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';

export default function FloatingCartButton() {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={styles.fab}
      onPress={() => router.push('/cart')}
    >
      <Ionicons name="cart-outline" size={24} color="#fff" />
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
});
