// app/_layout.tsx
import { ThemeProvider } from '@/contexts/ThemeContext';
import { Stack } from 'expo-router';
import { Provider } from 'react-redux';
import store from '../redux/store';

export default function RootStackLayout() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Stack
          screenOptions={{
            headerShown: false,
            gestureEnabled: true,
          }}
        />
      </ThemeProvider>
    </Provider>
    
  );
}

