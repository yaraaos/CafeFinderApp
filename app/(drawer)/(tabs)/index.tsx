import { darkTheme, lightTheme } from '@/constants/themeColors';
import { useTheme } from '@/contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useDispatch } from 'react-redux';
import { addItem } from '../../../redux/cartSlice';

import FloatingCartButton from '@/components/FloatingCartBtn';
import MainPageBar from '@/components/MainPageBar';
import SearchBar from '@/components/SearchBar';
import CafeCard from '../../../components/CafeCard';
import CafeMenuModal from '../../../components/CafeMenuModal';

import { fetchBreweries } from '@/API/_api';


export default function Index() {
  const [searchQuery, setSearchQuery] = useState('');
  const [breweries, setBreweries] = useState<any[]>([]);  // holds the API data
  const [loading, setLoading] = useState(true); // loading flag
  const [error, setError] = useState<string|null>(null);
  
  const router = useRouter();
  const handleCategorySelect = (category: string) => {
    router.push(`/${category.toLowerCase()}`);
  };

  type RootDrawerParamList = {
  '(tabs)': undefined;
  filters: undefined;
  support: undefined;
  };

  const navigation = useNavigation<DrawerNavigationProp<RootDrawerParamList>>();

  const { theme } = useTheme();
  const colors = theme === 'dark' ? darkTheme : lightTheme;

  const dispatch = useDispatch();

  const [selectedCafe, setSelectedCafe] = useState(null);

  const showModal = useCallback((cafe: any) => {
    setSelectedCafe(cafe);
  }, []);
  const hideModal = useCallback(() => {
    setSelectedCafe(null);
  }, []);

  const cafesMapped = useMemo(() => {
    return breweries.map((item) => ({
      id: item.id,
      name: item.name,
      address: `${item.street || ''}, ${item.city}`,
      image: item.image_url || `https://picsum.photos/seed/${item.id}/300/300`,
    }));
  }, [breweries]);

  //const cafesNearYou = [
    //{ id: '1', name: 'Sweeter', address: 'Nauky Ave, 14', image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93' },
    //{ id: '2', name: 'Dim Kavy', address: 'Nauky Ave, 18', image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24' },
  //];

  const lastOrders = [
    { id: '101', name: 'Latte Machiato', cafe: 'Sweeter', image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGNvZmZlZXxlbnwwfHwwfHx8MA%3D%3D' },
    { id: '102', name: 'Matcha Latte', cafe: 'Kofein', image: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWF0Y2hhfGVufDB8fDB8fHww' },
  ];

  const discoverNewCafes = useMemo(() => [
    { id: '103', name: 'Green Coffee', address: 'Main St', image: 'https://images.unsplash.com/photo-1525610553991-2bede1a236e2' },
    { id: '104', name: 'Urban Brew', address: 'City Center', image: 'https://images.unsplash.com/photo-1615322958568-7928d3291f7a' },
  ], []);

  useEffect(() => {
    fetchBreweries('Odessa', 1, 30)
      .then((data) => {
      setBreweries(data);
      setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
   }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.openDrawer()} style={{ marginLeft: 16 }}>
          <Ionicons name="menu" size={24} color="black" />
        </TouchableOpacity>
      ),
      headerShown: false,
    });
  }, [navigation]);

  // loading & error guards
  if (loading){
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  if (error) {
    return (
      <View style={styles.loader}>
        <Text>Error: {error}</Text>
      </View>
    )
  }   
  

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <ScrollView style={styles.container}>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="What would you like to drink?"
        />
        <MainPageBar onSelect={handleCategorySelect} />

        {/* cafes section */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, {color: colors.text}]}>Cafes near you</Text>
          <TouchableOpacity onPress={() => 
            router.push('/breweriescafes')}>
            <Text style={styles.seeMore}>See more</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={cafesMapped}
          horizontal
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingRight: 16 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.cardWrapper}
              onPress={() => router.push(`/breweriescafes/${item.id}`)}>
              <CafeCard cafe={item} onMenuPress={showModal} />
            </TouchableOpacity>
           )}
        />

        {/* Last orders */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, {color: colors.text}]}>Your last orders</Text>
          <TouchableOpacity>
            <Text style={styles.seeMore}>See more</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          horizontal
          data={lastOrders}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingLeft: 4}}
          ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
          renderItem={({ item }) => (
            <View style={styles.lastOrderCard}>
              <View style={styles.lastOrderImageWrapper}>
                <Image
                  source={{ uri: item.image }}
                  style={styles.lastOrderImage}
                  resizeMode="cover"
                />
              </View>
              <Text style={styles.orderText}>{item.name}</Text>
              <Text style={styles.orderSub}>{item.cafe}</Text>

              <TouchableOpacity
                onPress={() => dispatch(addItem(item))}
                style={styles.addButton}
              >
                <Text style={styles.addButtonText}>Add to Cart</Text>
              </TouchableOpacity>
            </View>
          )}
        />

        {/* Discover new cafes */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, {color: colors.text}]}>Discover new cafes</Text>
          <TouchableOpacity>
            <Text style={styles.seeMore}>See more</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          horizontal
          data={discoverNewCafes}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingRight: 24 }}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.cardWrapper}>
              <CafeCard cafe={item} onMenuPress={showModal} />
            </View>
          )} 
        />
      </ScrollView>
      <FloatingCartButton />
      
      {/* Menu Modal Window */}
      <CafeMenuModal
        cafe={selectedCafe}
        visible={!!selectedCafe}
        onClose={hideModal}
      />
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
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingLeft: 8,
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

  lastOrderCard: {
    width: 140,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    padding: 8,
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
  lastOrderImageWrapper: {
    width: '100%',
    height: 90,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 6,
  },
  lastOrderImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
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

  breweryName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  brewerySub: {
    fontSize: 14,
    color: '#666',
  },

  addButton: {
    marginTop: 8,
    paddingVertical: 6,
    backgroundColor: '#578600',
    borderRadius: 6,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600',
  },

});
