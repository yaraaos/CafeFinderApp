// app/(drawer)/(tabs)/_layout.tsx
import type { RootState } from '@/redux/store';
import { Ionicons } from '@expo/vector-icons';
import { Tabs, useRouter } from 'expo-router';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';


export default function TabLayout() {
  const router = useRouter();
  const favorites = useSelector((state: RootState) => state.favorites);

  const hasFavorites = favorites.length > 0;

  return (
    <>
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'index') iconName = 'home';
          else if (route.name === 'desserts') iconName = 'ice-cream';
          else if (route.name === 'cafes') iconName = 'cafe';
          else if (route.name === 'drinks') iconName = 'wine';

          return <Ionicons name={iconName as any} size={size} color={color} />;
        },

        tabBarLabel: route.name === 'index' ? 'Home' : route.name.charAt(0).toUpperCase() + route.name.slice(1),
        tabBarActiveTintColor: '#578600',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="desserts" />
      {/*Creates spacing around the favorites button in the center of tabs*/}
      <Tabs.Screen
        name="spacer"
        options={{
          tabBarButton: () => 
            <View pointerEvents='none'/>,
        }}
      />
      <Tabs.Screen name="drinks" />
      <Tabs.Screen name="cafes" />
    </Tabs>

    {/* Floating Favorites Button */}
    <TouchableOpacity
      onPress={() => router.push('/favorites')}
      style={styles.fab}
    >
      <Ionicons name="heart" size={24} color={hasFavorites ? 'red' : '#fff'} />
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 35,
    left: '50%',
    transform: [{ translateX: -28 }],
    backgroundColor: 'rgba(0,0,0,0.8)',
    borderRadius: 30,
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
  },
});
