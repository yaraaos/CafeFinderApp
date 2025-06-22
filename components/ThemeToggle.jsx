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
    padding: 8,
    borderRadius: 8,
    marginHorizontal: 12,
    marginBottom: 10,
    marginTop: 8,
  },
  label: {
    fontSize: 15,
    fontWeight: 500,
    marginLeft: 2,
  },
});
