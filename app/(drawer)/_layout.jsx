// app/(drawer)/_layout.jsx
import ThemeToggle from '@/components/ThemeToggle';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function DrawerLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <Drawer
        screenOptions={{
          headerShown: false,
          drawerActiveTintColor: '#578600',
          swipeEnabled: false,
          drawerType: 'front',
        }}
        drawerContent={(props) => (
            <DrawerContentScrollView {...props}>
              <DrawerItemList {...props} />
              <ThemeToggle />
            </DrawerContentScrollView>
          )}
        >
        {/* This connects to app/(drawer)/(tabs)/_layout.tsx */}
        <Drawer.Screen
          name="(tabs)"
          options={{
            drawerLabel: 'Home',
            title: 'Home',
            headerShown: false,
            drawerIcon: ({ color, size }) => (
              <Ionicons name="home-outline" size={size} color={color} />
            ),
          }}
        />
    
        {/* These automatically map to filters.tsx & support.tsx */}
        <Drawer.Screen
          name="filters"
          options={{
            title: 'Filters',
            drawerIcon: ({ color, size }) => (
              <Ionicons name="options-outline" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="support"
          options={{
            title: 'Support',
            drawerIcon: ({ color, size }) => (
              <Ionicons name="help-circle-outline" size={size} color={color} />
            ),
          }}
        />
        </Drawer>
      </ThemeProvider>
      
    </GestureHandlerRootView>
  );
}
