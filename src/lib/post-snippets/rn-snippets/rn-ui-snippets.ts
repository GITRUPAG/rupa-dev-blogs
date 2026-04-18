// src/lib/post-snippets/rn-ui-snippets.ts
 
export const rnUiSnippets = {
  customButton: `import { TouchableOpacity, Text, ActivityIndicator,
  StyleSheet, ViewStyle, TextStyle } from 'react-native';
 
type Variant = 'primary' | 'secondary' | 'danger' | 'ghost';
type Size    = 'sm' | 'md' | 'lg';
 
interface ButtonProps {
  label:     string;
  onPress:   () => void;
  variant?:  Variant;
  size?:     Size;
  loading?:  boolean;
  disabled?: boolean;
  icon?:     React.ReactNode;
}
 
export function Button({
  label, onPress,
  variant  = 'primary',
  size     = 'md',
  loading  = false,
  disabled = false,
  icon,
}: ButtonProps) {
  const isDisabled = disabled || loading;
 
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.75}
      style={[
        styles.base,
        styles[\`variant_\${variant}\`],
        styles[\`size_\${size}\`],
        isDisabled && styles.disabled,
      ]}
    >
      {loading
        ? <ActivityIndicator color={variant === 'ghost' ? '#6366f1' : '#fff'} size="small" />
        : <>
            {icon}
            <Text style={[styles.label, styles[\`labelVariant_\${variant}\`],
                          styles[\`labelSize_\${size}\`]]}>
              {label}
            </Text>
          </>
      }
    </TouchableOpacity>
  );
}
 
const styles = StyleSheet.create({
  base:              { flexDirection: 'row', alignItems: 'center',
                       justifyContent: 'center', borderRadius: 12, gap: 8 },
  disabled:          { opacity: 0.45 },
 
  variant_primary:   { backgroundColor: '#6366f1' },
  variant_secondary: { backgroundColor: '#1f2937' },
  variant_danger:    { backgroundColor: '#ef4444' },
  variant_ghost:     { backgroundColor: 'transparent',
                       borderWidth: 1, borderColor: '#374151' },
 
  size_sm: { paddingHorizontal: 12, paddingVertical: 8 },
  size_md: { paddingHorizontal: 20, paddingVertical: 12 },
  size_lg: { paddingHorizontal: 28, paddingVertical: 16 },
 
  label:              { fontWeight: '600' },
  labelVariant_ghost: { color: '#e5e7eb' },
  labelVariant_primary:   { color: '#ffffff' },
  labelVariant_secondary: { color: '#ffffff' },
  labelVariant_danger:    { color: '#ffffff' },
 
  labelSize_sm: { fontSize: 13 },
  labelSize_md: { fontSize: 15 },
  labelSize_lg: { fontSize: 17 },
});`,
 
  animatedCard: `import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue, useAnimatedStyle,
  withSpring, withTiming, interpolate,
} from 'react-native-reanimated';
 
export function FlipCard({ front, back }: { front: string; back: string }) {
  const rotation = useSharedValue(0);
  const flipped  = useSharedValue(0);
 
  const frontStyle = useAnimatedStyle(() => ({
    transform: [{ rotateY: \`\${interpolate(rotation.value, [0, 1], [0, 180])}deg\` }],
    opacity: interpolate(rotation.value, [0, 0.5, 1], [1, 0, 0]),
  }));
 
  const backStyle = useAnimatedStyle(() => ({
    transform: [{ rotateY: \`\${interpolate(rotation.value, [0, 1], [180, 360])}deg\` }],
    opacity: interpolate(rotation.value, [0, 0.5, 1], [0, 0, 1]),
    position: 'absolute',
  }));
 
  function flip() {
    flipped.value = flipped.value === 0 ? 1 : 0;
    rotation.value = withSpring(flipped.value, { damping: 12 });
  }
 
  return (
    <TouchableOpacity onPress={flip} activeOpacity={1}>
      <View style={styles.cardContainer}>
        <Animated.View style={[styles.card, styles.front, frontStyle]}>
          <Text style={styles.cardText}>{front}</Text>
        </Animated.View>
        <Animated.View style={[styles.card, styles.back, backStyle]}>
          <Text style={styles.cardText}>{back}</Text>
        </Animated.View>
      </View>
    </TouchableOpacity>
  );
}
 
const styles = StyleSheet.create({
  cardContainer: { width: 240, height: 140 },
  card: {
    width: '100%', height: '100%', borderRadius: 16,
    alignItems: 'center', justifyContent: 'center',
    backfaceVisibility: 'hidden',
  },
  front:    { backgroundColor: '#6366f1' },
  back:     { backgroundColor: '#ec4899' },
  cardText: { color: '#fff', fontSize: 18, fontWeight: '700' },
});`,
}