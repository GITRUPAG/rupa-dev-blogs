// src/lib/post-snippets/rn-basics-snippets.ts
 
export const rnBasicsSnippets = {
  helloWorld: `import { View, Text, StyleSheet } from 'react-native';
 
export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello, React Native!</Text>
      <Text style={styles.subtitle}>Building for iOS & Android</Text>
    </View>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0f0f0f',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  subtitle: {
    fontSize: 16,
    color: '#888888',
    marginTop: 8,
  },
});`,
 
  coreComponents: `import { View, Text, Image, ScrollView,
  TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { useState } from 'react';
 
export default function ComponentsDemo() {
  const [text, setText] = useState('');
  const [pressed, setPressed] = useState(false);
 
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Text */}
      <Text style={styles.heading}>Core Components</Text>
 
      {/* TextInput */}
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
        placeholder="Type something..."
        placeholderTextColor="#666"
      />
      {text ? <Text style={styles.echo}>You typed: {text}</Text> : null}
 
      {/* TouchableOpacity */}
      <TouchableOpacity
        style={[styles.button, pressed && styles.buttonPressed]}
        onPress={() => setPressed(p => !p)}
        activeOpacity={0.7}
      >
        <Text style={styles.buttonText}>
          {pressed ? '✓ Pressed!' : 'Press Me'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
 
const styles = StyleSheet.create({
  container:     { flex: 1, backgroundColor: '#0f0f0f' },
  content:       { padding: 24, gap: 16 },
  heading:       { fontSize: 22, fontWeight: '700', color: '#fff' },
  input:         { borderWidth: 1, borderColor: '#333', borderRadius: 10,
                   padding: 12, color: '#fff', fontSize: 16 },
  echo:          { color: '#888', fontSize: 14 },
  button:        { backgroundColor: '#6366f1', borderRadius: 10,
                   padding: 14, alignItems: 'center' },
  buttonPressed: { backgroundColor: '#4f46e5' },
  buttonText:    { color: '#fff', fontWeight: '600', fontSize: 16 },
});`,
 
  flexbox: `import { View, Text, StyleSheet } from 'react-native';
 
// React Native uses Flexbox by default — column direction
// Change flexDirection to 'row' for horizontal layouts
 
function Card({ label, color }: { label: string; color: string }) {
  return (
    <View style={[styles.card, { backgroundColor: color }]}>
      <Text style={styles.cardText}>{label}</Text>
    </View>
  );
}
 
export default function FlexDemo() {
  return (
    <View style={styles.container}>
      {/* Row layout */}
      <Text style={styles.label}>flexDirection: row</Text>
      <View style={styles.row}>
        <Card label="A" color="#6366f1" />
        <Card label="B" color="#ec4899" />
        <Card label="C" color="#f59e0b" />
      </View>
 
      {/* Space between */}
      <Text style={styles.label}>justifyContent: space-between</Text>
      <View style={[styles.row, { justifyContent: 'space-between' }]}>
        <Card label="1" color="#10b981" />
        <Card label="2" color="#3b82f6" />
        <Card label="3" color="#ef4444" />
      </View>
 
      {/* flex: 1 — fill remaining space */}
      <Text style={styles.label}>flex: 1 (fill space)</Text>
      <View style={styles.row}>
        <View style={[styles.flexFill, { backgroundColor: '#6366f1' }]}>
          <Text style={styles.cardText}>flex: 2</Text>
        </View>
        <View style={[styles.flexHalf, { backgroundColor: '#ec4899' }]}>
          <Text style={styles.cardText}>flex: 1</Text>
        </View>
      </View>
    </View>
  );
}
 
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f0f0f', padding: 20, gap: 8 },
  label:     { color: '#888', fontSize: 12, fontFamily: 'monospace' },
  row:       { flexDirection: 'row', gap: 8 },
  card:      { padding: 16, borderRadius: 8, alignItems: 'center', minWidth: 60 },
  cardText:  { color: '#fff', fontWeight: '700' },
  flexFill:  { flex: 2, padding: 16, borderRadius: 8, alignItems: 'center' },
  flexHalf:  { flex: 1, padding: 16, borderRadius: 8, alignItems: 'center' },
});`,
 
  stateCounter: `import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useState } from 'react';
 
export default function Counter() {
  const [count, setCount] = useState(0);
 
  const increment = () => setCount(c => c + 1);
  const decrement = () => setCount(c => c - 1);
  const reset     = () => setCount(0);
 
  const color = count > 0 ? '#10b981' : count < 0 ? '#ef4444' : '#888';
 
  return (
    <View style={styles.container}>
      <Text style={[styles.count, { color }]}>{count}</Text>
 
      <View style={styles.row}>
        <TouchableOpacity style={[styles.btn, styles.red]} onPress={decrement}>
          <Text style={styles.btnText}>−</Text>
        </TouchableOpacity>
 
        <TouchableOpacity style={[styles.btn, styles.gray]} onPress={reset}>
          <Text style={styles.btnText}>↺</Text>
        </TouchableOpacity>
 
        <TouchableOpacity style={[styles.btn, styles.green]} onPress={increment}>
          <Text style={styles.btnText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
 
const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center',
               backgroundColor: '#0f0f0f' },
  count:     { fontSize: 80, fontWeight: '800', fontVariant: ['tabular-nums'] },
  row:       { flexDirection: 'row', gap: 16, marginTop: 32 },
  btn:       { width: 64, height: 64, borderRadius: 32,
               alignItems: 'center', justifyContent: 'center' },
  btnText:   { color: '#fff', fontSize: 28, fontWeight: '600' },
  red:       { backgroundColor: '#ef4444' },
  green:     { backgroundColor: '#10b981' },
  gray:      { backgroundColor: '#374151' },
});`,
}