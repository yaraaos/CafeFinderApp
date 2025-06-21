// app/(drawer)/_layout.jsx

import ThemeToggle from '@/components/ThemeToggle';
import { darkTheme, lightTheme } from '@/constants/themeColors';
import { useTheme } from '@/contexts/ThemeContext';

import { Ionicons } from '@expo/vector-icons';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Drawer } from 'expo-router/drawer';
import { StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import FloatingCartButton from '../../components/FloatingCartBtn';

export default function DrawerLayout() {
  const { theme } = useTheme();
  const colors = theme === 'dark' ? darkTheme : lightTheme;

  return (
<GestureHandlerRootView style={{ flex: 1 }}>
  <View style={styles.container}>
      <Drawer
        screenOptions={{
          headerShown: false,
          swipeEnabled: true,
          drawerType: 'front',
          drawerStyle: {
            backgroundColor: colors.background,
          },
          drawerLabelStyle: {
            color: colors.text,
          },
          drawerActiveTintColor: colors.accent,
          drawerInactiveTintColor: colors.text, 
        }}
        drawerContent={(props) => (
          <DrawerContentScrollView 
            {...props}
            contentContainerStyle={{ backgroundColor: colors.background}}
          >
            <DrawerItemList {...props} />
            <ThemeToggle />
          </DrawerContentScrollView>
        )}
      >
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
          listeners={({ navigation }) => ({
            drawerItemPress: (e) => {
              e.preventDefault(); 
              navigation.navigate('(tabs)', { screen: 'index' }); 
            },
          })}
        />
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

    <FloatingCartButton />
  </View>
</GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    
  },
});
