// app/(tabs)/_layout.tsx
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';


export default function TabLayout() {
  return (
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
    />
  );
}
