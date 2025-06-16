import React from 'react';
import { Modal, Text, View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';

export default function CafeMenuModal({ cafe, visible, onClose }) {
  const modalOpacity = useSharedValue(visible ? 1 : 0);
  const modalTranslate = useSharedValue(visible ? 0 : 100);

  React.useEffect(() => {
    if (visible) {
      modalOpacity.value = withTiming(1);
      modalTranslate.value = withTiming(0);
    } else {
      modalOpacity.value = withTiming(0);
      modalTranslate.value = withTiming(100);
    }
  }, [visible]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: modalOpacity.value,
    transform: [{ translateY: modalTranslate.value }],
  }));

  return (
    <Modal visible={visible} transparent animationType="none">
      <View style={styles.overlay}>
        <Animated.View style={[styles.modalContent, animatedStyle]}>
          <Text style={styles.title}>{cafe?.name} Menu</Text>
          <Text style={styles.text}>
            Menu coming soon!
          </Text>
          <Text onPress={onClose} style={styles.close}>
            Close
          </Text>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#000000aa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  text: {
    fontSize: 16,
    color: '#444',
  },
  close: {
    marginTop: 20,
    fontSize: 16,
    color: '#ff914d',
    fontWeight: '600',
  },
});
