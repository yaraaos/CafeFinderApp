// app/_layout.tsx
import { Stack } from 'expo-router';

export default function RootStackLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* hook into the entire (drawer) group */}
      <Stack.Screen name="(drawer)" />
      
      {/* (for later) any global screens you want at root-level: */}
      {/* <Stack.Screen name="modal" options={{ presentation: 'modal' }} /> */}
    </Stack>
  );
}

