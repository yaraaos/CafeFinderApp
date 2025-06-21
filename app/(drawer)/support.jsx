import { darkTheme, lightTheme } from '@/constants/themeColors';
import { useTheme } from '@/contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SupportPage() {
  const { theme } = useTheme();
  const colors = theme === 'dark' ? darkTheme : lightTheme;

  const openMail = () => {
    Linking.openURL('mailto:support@cafefinder.com');
  };

  const rateApp = () => {
    Linking.openURL('https://apps.apple.com/ua/app/artisan-coffee-finder/id1521699791');
  };


  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <View style={styles.container}>
        <Text style={[styles.heading, { color: colors.text }]}>Support Center</Text>
        <Text style={[styles.subheading, { color: colors.text }]}>
          We are re here to help you enjoy your cafe experience. Choose an option below:
        </Text>

        <View style={styles.cardContainer}>
          <SupportCard
            icon="help-circle-outline"
            label="FAQs"
            onPress={() => alert('FAQ section coming soon')}
            colors={colors}
          />
          <SupportCard
            icon="mail-outline"
            label="Contact Support"
            onPress={openMail}
            colors={colors}
          />
          <SupportCard
            icon="star-outline"
            label="Rate the App"
            onPress={rateApp}
            colors={colors}
          />
        </View>

        <Text style={[styles.footerText, { color: colors.text }]}>© 2025 CafeFinderApp</Text>
      </View>
    </SafeAreaView>
  );
}

function SupportCard({ icon, label, onPress, colors }) {
  return (
    <TouchableOpacity style={[styles.card, { backgroundColor: colors.card }]} onPress={onPress}>
      <Ionicons name={icon} size={22} color={colors.accent} style={styles.icon} />
      <Text style={[styles.cardText, { color: colors.text }]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'flex-start',
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subheading: {
    fontSize: 16,
    opacity: 0.8,
    marginBottom: 24,
  },
  cardContainer: {
    gap: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  icon: {
    marginRight: 14,
  },
  cardText: {
    fontSize: 16,
    fontWeight: '600',
  },
  footerText: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 32,
    opacity: 0.5,
  },
});
