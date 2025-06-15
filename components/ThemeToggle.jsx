import React from 'react';
import { Switch, Text, View } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', padding: 16 }}>
      <Text style={{ marginRight: 10 }}>
        {theme === 'light' ? 'Light theme' : 'Dark theme'}
      </Text>
      <Switch value={theme === 'dark'} onValueChange={toggleTheme} />
    </View>
  );
}
