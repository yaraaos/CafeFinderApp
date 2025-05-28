import { StyleSheet, View } from "react-native";
/*import { SafeAreaView } from "react-native-safe-area-context";*/
import CustomButton from '@/components/CustomButton';

/*
export default function Index() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.text}>Main menu</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 22,
    lineHeight: 100,
    color: 'blue',
  }
})
*/

export default function HomeScreen() {
  const handleOrder = () => {
    alert('Checking out!');
  };

  return (
    <View style={styles.container}>


      <View style={styles.bottomContainer}>
        <CustomButton text="Checkout" color="#578600" onPress={handleOrder} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  bottomContainer : {
    padding: 24,
  },
})