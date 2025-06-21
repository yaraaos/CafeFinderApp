import React from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';
import { darkTheme, lightTheme } from '../constants/themeColors';
import { useTheme } from '../contexts/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const colors = theme === 'dark' ? darkTheme : lightTheme;


  return (
    <View style={[styles.container, { backgroundColor: colors.card }]}>
      <Text style={[styles.label, { color: colors.text }]}>
        {theme === 'light' ? 'Light theme' : 'Dark theme'}
      </Text>
      <Switch value={theme === 'dark'} onValueChange={toggleTheme} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 8,
    marginHorizontal: 16,
    marginVertical: 8,
  },
  label: {
    fontSize: 16,
  },
});
