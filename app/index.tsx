import SearchBar from '@/components/SearchBar';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CafeCard from '../components/CafeCard';

export default function Index() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const cafesNearYou = [
    { id: '1', name: 'Sweeter', address: 'Nauky Ave, 14', image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93' },
    { id: '2', name: 'Dim Kavy', address: 'Nauky Ave, 18', image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24' },
  ];

  const lastOrders = [
    { id: '101', name: 'Latte Machiato', cafe: 'Sweeter' },
    { id: '102', name: 'Matcha Latte', cafe: 'Kofein' },
  ];

  const discoverNewCafes = [
    { id: '3', name: 'Green Coffee', address: 'Main St', image: 'https://images.unsplash.com/photo-1525610553991-2bede1a236e2' },
    { id: '4', name: 'Urban Brew', address: 'City Center', image: 'https://images.unsplash.com/photo-1615322958568-7928d3291f7a' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="What would you like to drink?"
        />

        {/* Cafes Near You */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Cafes near you</Text>
          <TouchableOpacity onPress={() => router.push('/map')}>
            <Text style={styles.seeMore}>See more</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {cafesNearYou.map((cafe) => (
            <View key={cafe.id} style={styles.cardWrapper}>
              <CafeCard cafe={cafe} />
            </View>
          ))}
        </ScrollView>

        {/* Last Orders */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Your last orders</Text>
          <TouchableOpacity>
            <Text style={styles.seeMore}>See more</Text>
          </TouchableOpacity>
        </View>
        {lastOrders.map((order) => (
          <View key={order.id} style={styles.orderRow}>
            <Text style={styles.orderText}>{order.name}</Text>
            <Text style={styles.orderSub}>- {order.cafe}</Text>
          </View>
        ))}

        {/* Discover New Cafes */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Discover new cafes</Text>
          <TouchableOpacity>
            <Text style={styles.seeMore}>See more</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {discoverNewCafes.map((cafe) => (
            <View key={cafe.id} style={styles.cardWrapper}>
              <CafeCard cafe={cafe} />
            </View>
          ))}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  seeMore: {
    fontSize: 14,
    color: '#578600',
  },
  horizontalScroll: {
    paddingLeft: 2,
  },
  cardWrapper: {
    marginRight: 16,
    width: 220,
  },
  orderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    marginLeft: 4,
  },
  orderText: {
    fontSize: 15,
    fontWeight: '600',
  },
  orderSub: {
    fontSize: 14,
    color: '#666',
    marginLeft: 6,
  },
});
