//components/ItemsCard.jsx

import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const CARD_WIDTH = screenWidth / 2 - 24;

export default function ItemsCard({ item, onAddToCart }) {
  if (!item.name) return null;
  
  return (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>

      {onAddToCart && (
        <TouchableOpacity onPress={() => onAddToCart(item)} style={styles.button}>
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: 250,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    padding: 10,
    marginBottom: 8,
    justifyContent: 'space-between',
  },
  image: {
    width: '100%',
    height: 140,
    borderRadius: 8,
  },
  name: {
    marginTop: 10,
    fontSize: 15,
    fontWeight: '600',
  },
  button: {
    marginTop: 10,
    backgroundColor: '#578600',
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
});
