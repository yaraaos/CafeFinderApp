import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Slot } from 'expo-router';
import React from 'react';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
      }}
    >
      {/* Expo Router вставляє екрани через <Slot /> */}
      <Stack.Screen name="root" options={{ headerShown: false }}>
        {() => <Slot />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
