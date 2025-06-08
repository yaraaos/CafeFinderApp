// app/breweriescafes/[id].tsx

import { fetchBreweryById } from '@/API/_api';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Brewery = {
  id: string;
  name: string;
  brewery_type?: string;
  street?: string;
  city?: string;
  state?: string;
  phone?: string;
  website_url?: string;
};

export default function BreweryDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  console.log('🆔 BreweryDetailScreen received id:', id);
  const router = useRouter();

  const [brewery, setBrewery] = useState<Brewery | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    fetchBreweryById(id)
      .then((data) => {
        setBrewery(data as Brewery);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error || !brewery) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Error: {error ?? 'No data found.'}</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backText}>← Go back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Picsum if no real photo
  const imageUrl = `https://picsum.photos/seed/${brewery.id}/600/300`;

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.content}>
        <Image
          source={{ uri: imageUrl }}
          style={styles.headerImage}
          resizeMode="cover"
        />

        <Text style={styles.title}>{brewery.name}</Text>
        {brewery.brewery_type && (
          <Text style={styles.type}>{brewery.brewery_type.toUpperCase()}</Text>
        )}

        <View style={styles.section}>
          <Text style={styles.label}>Address:</Text>
          <Text style={styles.value}>
            {brewery.street ?? ''}, {brewery.city ?? ''}, {brewery.state ?? ''}
          </Text>
        </View>

        {brewery.phone && (
          <TouchableOpacity
            onPress={() => Linking.openURL(`tel:${brewery.phone}`)}
            style={styles.section}
          >
            <Text style={styles.label}>Phone:</Text>
            <Text style={[styles.value, styles.link]}>{brewery.phone}</Text>
          </TouchableOpacity>
        )}

        {brewery.website_url && (
          <TouchableOpacity
            onPress={() => Linking.openURL(brewery.website_url!)}
            style={styles.section}
          >
            <Text style={styles.label}>Website:</Text>
            <Text style={[styles.value, styles.link]}>
              {brewery.website_url}
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  center:    { flex: 1, justifyContent: 'center', alignItems: 'center' },
  backButton:{ padding: 16 },
  backText:  { fontSize: 16, color: '#578600' },

  content:   { padding: 16 },
  headerImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 16,
  },

  title:     { fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
  type:      { fontSize: 14, color: '#888', marginBottom: 16 },

  section:   { marginBottom: 16 },
  label:     { fontSize: 16, fontWeight: '600' },
  value:     { fontSize: 16, marginTop: 4 },
  link:      { color: '#578600', textDecorationLine: 'underline' },

  errorText: { color: 'red', marginBottom: 12, textAlign: 'center' },
});
