import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Slot } from 'expo-router';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
      }}
    >

      <Stack.Screen name="root" options={{ headerShown: false }}>
        {() => <Slot />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
