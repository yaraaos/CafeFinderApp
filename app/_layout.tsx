// app/_layout.tsx
import { Stack } from 'expo-router';
import { Provider } from 'react-redux';
import store from '../redux/store';

export default function RootStackLayout() {
  return (
    <Provider store={store}>
      <Stack
        screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        }}
      >
      {/* hook into the entire (drawer) group */}
        <Stack.Screen name="(drawer)" />
      
      {/* (for later) any global screens you want at root-level: */}
      {/* <Stack.Screen name="modal" options={{ presentation: 'modal' }} /> */}
      </Stack>
    </Provider>
    
  );
}

