// app/_layout.tsx
import { Stack } from 'expo-router';

export default function RootStackLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,        // hide headers on the root stack
      }}
    >
      {/* hook into the entire (drawer) group */}
      <Stack.Screen name="(drawer)" />
      
      {/* any global screens you want at root-level: */}
      {/* <Stack.Screen name="modal" options={{ presentation: 'modal' }} /> */}
    </Stack>
  );
}

