import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useDispatch } from 'react-redux';
import { addItem } from '../redux/cartSlice';

type Cafe = {
  id?: string;
  name: string;
};

type CafeMenuModalProps = {
  cafe: Cafe | null;
  visible: boolean;
  onClose: () => void;
};

export default function CafeMenuModal({ cafe, visible, onClose }: CafeMenuModalProps) {
  const modalOpacity = useSharedValue(visible ? 1 : 0);
  const modalTranslate = useSharedValue(visible ? 0 : 100);
  const dispatch = useDispatch();

  type MenuItem = {
    id: string;
    name: string;
    image: string;
    price: number;
  };

  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (visible) {
      modalOpacity.value = withTiming(1);
      modalTranslate.value = withTiming(0);

      // Fetch random food & drink items
      setLoading(true);
      Promise.all([
        fetch('https://www.themealdb.com/api/json/v1/1/search.php?s='),
        fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=coffee')
      ])
        .then(async ([res1, res2]) => {
          const meals = (await res1.json()).meals || [];
          const drinks = (await res2.json()).drinks || [];

          const combined = [...meals, ...drinks]
            .sort(() => 0.5 - Math.random())
            .slice(0, 6)
            .map((item, index) => ({
              id: item.idMeal || item.idDrink || String(index),
              name: item.strMeal || item.strDrink,
              image: item.strMealThumb || item.strDrinkThumb,
              price: parseFloat((Math.random() * 4 + 2).toFixed(2)),
            }));

          setMenuItems(combined);
          setLoading(false);
        });
    } else {
      modalOpacity.value = withTiming(0);
      modalTranslate.value = withTiming(100);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: modalOpacity.value,
    transform: [{ translateY: modalTranslate.value }],
  }));

  return (
    <Modal visible={visible} transparent animationType="none">
      <View style={styles.overlay}>
        <Animated.View style={[styles.modalContent, animatedStyle]}>
          <Text style={styles.title}>{cafe?.name} Menu</Text>

          {loading ? (
            <ActivityIndicator size="large" color="#578600" />
          ) : (
            <FlatList
              data={menuItems}
              keyExtractor={(item) => item.id}
              contentContainerStyle={{ paddingVertical: 8 }}
              renderItem={({ item }) => (
                <View style={styles.menuItem}>
                  <Image source={{ uri: item.image }} style={styles.image} />
                  <View style={{ flex: 1, marginLeft: 10 }}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.price}>€ {item.price.toFixed(2)}</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.addBtn}
                    onPress={() => dispatch(addItem(item))}
                  >
                    <Text style={styles.addText}>Add</Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          )}

          <Text onPress={onClose} style={styles.close}>
            Close
          </Text>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#000000aa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    maxHeight: '80%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 6,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
  },
  price: {
    fontSize: 14,
    color: '#666',
  },
  addBtn: {
    backgroundColor: '#578600',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  addText: {
    color: '#fff',
    fontWeight: '600',
  },
  close: {
    marginTop: 16,
    textAlign: 'center',
    color: '#ff914d',
    fontWeight: '600',
    fontSize: 16,
  },
});
