import { StyleSheet, Text, View } from 'react-native';

export default function DrinksScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Drinks Page</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
  },
});
