import { Dimensions, StyleSheet, Text, TouchableOpacity } from 'react-native';

const screenWidth = Dimensions.get('window').width;

export default function CustomButton({ text, onPress, color = '#4CAF50', size = 'medium' }) {
  const buttonStyles = [
    styles.button,
    { backgroundColor: color, paddingVertical: size === 'large' ? 16 : 12 }
  ];

  return (
    <TouchableOpacity style={buttonStyles} onPress={onPress}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: screenWidth * 0.9,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 600,
    fontSize: 12,
  },
});
