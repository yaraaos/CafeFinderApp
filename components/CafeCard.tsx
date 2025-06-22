import { toggleFavorite } from '@/redux/favoritesSlice';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux//store';

//const screenHeight = Dimensions.get('window').height;
//const CARD_HEIGHT = screenHeight * 0.3;

export type Cafe = {
  id: string;
  name: string;
  address: string;
  image: string;
  latitude?: number;
  longitude?: number;
  description?: string;
};

type CafeCardProps = {
  cafe: Cafe;
  onMenuPress?: (cafe: Cafe) => void;
};

function CafeCard({ cafe, onMenuPress = () => {} }: CafeCardProps) {
  const dispatch = useDispatch();
  const isFavorite = useSelector((state: RootState) =>
    state.favorites.some((f: Cafe) => f.id === cafe.id)
  );

  const handleAddToFaves = () => {
    dispatch(toggleFavorite(cafe));
  };

  console.log(`🔁 Re-rendering CafeCard: ${cafe.name}`);



  return (
    <View style={styles.card}>
      {/* Cafe Image with Heart Icon */}
      <View style={styles.imageWrapper}>
        <Image source={{ uri: cafe.image }} style={styles.image} />
        <TouchableOpacity style={styles.heartIcon} onPress={handleAddToFaves}>
          <Ionicons
            name={isFavorite ? 'heart' : 'heart-outline'}
            size={20}
            color={isFavorite ? 'red' : '#fff'}
          />
        </TouchableOpacity>
      </View>

      {/* Info */}
      <View style={styles.info}>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.name}>
          {cafe.name}
        </Text>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.address}>
          {cafe.address}
        </Text>

        <TouchableOpacity style={styles.menuBtn} onPress={() => onMenuPress?.(cafe)}>
          <Text style={styles.menuBtnText}>See menu</Text>
        </TouchableOpacity>
      </View>

      
    </View>
  );
}

// for debugging render performance
CafeCard.whyDidYouRender = true;
export default React.memo(CafeCard);


const styles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
      },
      android: {
        elevation: 0, //Completely removes shadows on Android
      },
    }),
  },
  imageWrapper: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 190,
  },
  heartIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 6,
    borderRadius: 20,
  },
  info: {
    padding: 12,
  },
  name: {
    flex: 1,
    fontWeight: '600',
    fontSize: 16,
    marginRight: 8,
    color: '#000',
  },
  address: {
    fontSize: 13,
    color: '#666',
    paddingBottom: 10,
  },
  menuBtn: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    borderColor: "#578600",
    borderWidth: 1,
  },
  menuBtnText: {
    color: '#578600',
    fontWeight: '600',
    fontSize: 14,
  },
});
