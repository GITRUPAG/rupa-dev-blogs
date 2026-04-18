// src/lib/post-snippets/rn-api-snippets.ts
 
export const rnApiSnippets = {
  fetchProducts: `import { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator,
  TouchableOpacity, StyleSheet } from 'react-native';
 
interface Product {
  id:    number;
  title: string;
  price: number;
}
 
export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState<string | null>(null);
 
  useEffect(() => {
    fetchProducts();
  }, []);
 
  async function fetchProducts() {
    setLoading(true);
    setError(null);
    try {
      const res  = await fetch('https://fakestoreapi.com/products?limit=10');
      if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }
 
  if (loading) return (
    <View style={styles.center}>
      <ActivityIndicator size="large" color="#6366f1" />
    </View>
  );
 
  if (error) return (
    <View style={styles.center}>
      <Text style={styles.error}>{error}</Text>
      <TouchableOpacity style={styles.retry} onPress={fetchProducts}>
        <Text style={styles.retryText}>Try Again</Text>
      </TouchableOpacity>
    </View>
  );
 
  return (
    <FlatList
      data={products}
      keyExtractor={item => String(item.id)}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
          <Text style={styles.price}>\${item.price.toFixed(2)}</Text>
        </View>
      )}
    />
  );
}
 
const styles = StyleSheet.create({
  center:    { flex: 1, alignItems: 'center', justifyContent: 'center',
               backgroundColor: '#0f0f0f' },
  list:      { padding: 16, gap: 12, backgroundColor: '#0f0f0f' },
  card:      { backgroundColor: '#1a1a1a', borderRadius: 12, padding: 16,
               flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  title:     { color: '#fff', fontSize: 14, flex: 1, marginRight: 12 },
  price:     { color: '#10b981', fontWeight: '700', fontSize: 16 },
  error:     { color: '#ef4444', fontSize: 16, marginBottom: 16 },
  retry:     { backgroundColor: '#6366f1', paddingHorizontal: 24,
               paddingVertical: 10, borderRadius: 8 },
  retryText: { color: '#fff', fontWeight: '600' },
});`,
}