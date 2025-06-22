//components/ItemsCard.jsx

import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const CARD_WIDTH = screenWidth / 2 - 24;

export default function ItemsCard({ item, onAddToCart, size = 'default' }) {
  const isSmall = size === 'small';
  
  return (
    <View style={[styles.card, isSmall && styles.smallCard]}>         
      
      <Image source={{ uri: item.image }} style={[styles.image, isSmall && styles.smallImage]} />
      <Text style={[styles.price, isSmall && styles.smallPrice]}>${item.price?.toFixed(2)}</Text>
      <Text style={[styles.name, isSmall && styles.smallText]}>{item.name}</Text>

      {onAddToCart && (
        <TouchableOpacity onPress={() => onAddToCart(item)} style={[styles.addButton, isSmall && styles.smallBtn]}>

          <Text style={[styles.buttonText, isSmall && styles.smallBtnText]}>Add to Cart</Text>
          
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
  smallCard: {
  width: 120,
  height: 180,
  padding: 8,
},
  image: {
    width: '100%',
    height: 140,
    borderRadius: 8,
    position: 'relative',
  },
  smallImage: {
  height: 90,
},
  name: {
    marginTop: 10,
    fontSize: 15,
    fontWeight: '600',
  },
  smallText: {
  fontSize: 13,
  },
  addButton: {
    marginTop: 10,
    backgroundColor: '#578600',
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  smallBtn: {
    marginTop: 5,
    backgroundColor: '#578600',
    paddingVertical: 6,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  smallBtnText:{
    fontSize: 13,
  },
  price: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#578600',
    color: '#fff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    fontSize: 13,
    fontWeight: '600',
  },
  smallPrice: {
    top: 8,
    right: 8,
    paddingHorizontal: 6,
    paddingVertical: 3,
    fontSize: 11,
  },
});
