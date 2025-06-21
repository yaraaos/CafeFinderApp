//app/onboarding

import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function OnboardingScreen() {
  const router = useRouter();

  const images = [
  'https://images.unsplash.com/photo-1555396273-367ea4eb4db5',
  'https://images.unsplash.com/photo-1525385133513-3b63f61f3162',
  'https://images.unsplash.com/photo-1509042239860-f550ce710b93',
  'https://images.unsplash.com/photo-1600880292089-90a7e086ee1a',
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const imageCount = images.length;
    const interval = setInterval(() => {
        setIndex((prev) => (prev + 1) % imageCount);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);


  return (
    <View style={styles.container}>
      {/* Dynamic image */}
      <Image
        source={{ uri: images[index] }}
        style={styles.image}
        contentFit="cover"
        transition={500}
      />

      {/* Bottom card */}
      <View style={styles.bottomCard}>
        <View style={styles.dots}>
          {images.map((_, i) => (
            <View
              key={i}
              style={[styles.dot, index === i && styles.activeDot]}
            />
          ))}
        </View>

        <Text style={styles.title}>Find and order your favorite drink near you</Text>
        <Text style={styles.subtitle}>
          Skip the line, discover great coffee spots and order ahead in seconds.
        </Text>

        <TouchableOpacity style={styles.button} onPress={() => router.replace('/(drawer)')}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 0.7,
    width: '100%',
  },
  bottomCard: {
    flex: 0.3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    justifyContent: 'space-between',
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 12,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#578600',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'left',
    color: '#000',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
    textAlign: 'left',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#578600',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 18,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
