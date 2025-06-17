import { toggleFavorite } from '@/redux/favoritesSlice';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Dimensions, Image, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux//store';

const screenHeight = Dimensions.get('window').height;
const CARD_HEIGHT = screenHeight * 0.3;

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
      <Image source={{ uri: cafe.image }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{cafe.name}</Text>
        <Text style={styles.address}>{cafe.address}</Text>

        <View style={styles.buttonRow}>
          <Pressable onPress={() => onMenuPress(cafe)} style={styles.menuButton}>
            <Text style={styles.menuButtonText}>See Menu</Text>
          </Pressable>

          <Pressable onPress={handleAddToFaves} style={styles.faveButton}>
            <Ionicons
              name={isFavorite ? 'star' : 'star-outline'}
              size={22}
              color={isFavorite ? '#facc15' : '#333'}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

// for debugging render performance
CafeCard.whyDidYouRender = true;
export default React.memo(CafeCard);


const styles = StyleSheet.create({
  card: {
    flex: 1,
    height: CARD_HEIGHT,
    borderRadius: 12,
    overflow: 'hidden',
    marginHorizontal: 4,
    backgroundColor: '#fff',
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
  image: {
    width: '100%',
    height: '65%',
  },
  textContainer: {
    padding: 12,
    height: '30%',
  },
  name: {
    fontSize: 15.5,
    fontWeight: 'bold',
  },
  address: {
    fontSize: 13,
    color: '#666',
    marginTop: 4,
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 8,
  },
  menuButton: {
    flex: 5,
    paddingVertical: 0,
    paddingHorizontal: 12,
    marginBottom: 4,
    backgroundColor: '#ff914d',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  menuButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  faveButton: {
    flex: 1,
    paddingVertical: 3,
    backgroundColor: '#fff',
    marginBottom: 4,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
