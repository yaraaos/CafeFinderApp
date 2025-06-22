// app/thankyou.jsx
import { darkTheme, lightTheme } from '@/constants/themeColors';
import { useTheme } from '@/contexts/ThemeContext';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ThankYouScreen() {
  const [prepTime, setPrepTime] = useState(0);
  const router = useRouter();
  const { theme } = useTheme();
  const colors = theme === 'dark' ? darkTheme : lightTheme;

  useEffect(() => {
    const randomTime = Math.floor(Math.random() * 15) + 5; // between 5-20 min
    setPrepTime(randomTime);
  }, []);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Thank you for your order!</Text>
      <Text style={[styles.subtitle, { color: colors.text }]}>
        It will be ready in approximately {prepTime} minutes.
      </Text>

      <TouchableOpacity onPress={() => router.replace('/(drawer)')} style={styles.button}>
        <Text style={styles.buttonText}>Back to Home</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 32,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#578600',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
