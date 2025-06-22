//components/ItemsCard.jsx

import { darkTheme, lightTheme } from '@/constants/themeColors';
import { useTheme } from '@/contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../redux/favoritesSlice';

const screenWidth = Dimensions.get('window').width;
const CARD_WIDTH = screenWidth / 2 - 24;

export default function ItemsCard({ item, onAddToCart, showFavorite = true, size = 'default' }) {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);
  const isFavorite = favorites.some((fav) => fav.id === item.id);

  const { theme } = useTheme();
  const colors = theme === 'dark' ? darkTheme : lightTheme;
  const isSmall = size === 'small';

  const toggle = () => dispatch(toggleFavorite(item));
  
  return (
    <View style={[styles.card, isSmall && styles.smallCard, { backgroundColor: colors.card || '#fff' }]}>  
      <View style={styles.imageWrapper}>       
        <Image source={{ uri: item.image }} style={[styles.image, isSmall && styles.smallImage]} />
        { showFavorite && (
          <TouchableOpacity style={styles.heartIcon} onPress={toggle}>
            <Ionicons name={isFavorite ? 'heart' : 'heart-outline'} size={18} color={isFavorite ? 'red' : colors.text} />
          </TouchableOpacity>
        )}
      </View>
      
        <Text style={[styles.name, isSmall && styles.smallText, { color: colors.text }]} numberOfLines={1}>{item.name}</Text>
        <Text style={[styles.price, isSmall && styles.smallPrice, { color: colors.text }]}>${item.price?.toFixed(2)}</Text>
        

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
  imageWrapper: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 140,
    borderRadius: 8,
  },
  smallImage: {
    height: 90,
  },
  heartIcon: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 12,
    padding: 4,
  },
  name: {
    marginTop: 10,
    fontSize: 15,
    fontWeight: '600',
  },
  smallText: {
    fontSize: 13,
  },  
  price: {
    fontSize: 13,
    marginTop: 4,
    fontWeight: '500',
  },
  smallPrice: {
    fontSize: 11,
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

});
