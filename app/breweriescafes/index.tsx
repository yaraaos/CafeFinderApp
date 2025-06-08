// app/(tabs)/breweries/index.tsx

import { fetchBreweries } from '@/API/_api';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity
} from 'react-native';

/**
 * Screen that shows the full list of breweries.
 * Fetches from the API, handles loading & errors, and
 * lets you tap into the details screen.
 */
export default function BreweriesList() {
  const [breweries, setBreweries] = useState<any[]>([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchBreweries('', 1, 50) // no city filter, 50 items
      .then((data) => {
        setBreweries(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <ActivityIndicator style={styles.center} />;
  if (error)   return <Text style={styles.center}>Error: {error}</Text>;

  return (
    <FlatList
      data={breweries}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.item}
          onPress={() => router.push(`/details/${item.id}`)}
        >
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.subtitle}>
            {item.street}, {item.city}
          </Text>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  list:   { padding: 16 },
  item:   { marginBottom: 12, padding: 12, backgroundColor: '#fff', borderRadius: 8 },
  title:  { fontSize: 18, fontWeight: 'bold' },
  subtitle:{ fontSize: 14, color: '#666', marginTop: 4 },
});
