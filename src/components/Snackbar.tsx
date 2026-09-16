import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const colors = {
  ink: '#1A1C1C',
  surface: '#FFFFFF',
  error: '#AB3425',
};

type SnackbarProps = {
  visible: boolean;
  message: string;
  variant?: 'error' | 'default';
  duration?: number;
  onDismiss: () => void;
};

function Snackbar({
  visible,
  message,
  variant = 'default',
  duration = 3000,
  onDismiss,
}: SnackbarProps) {
  const insets = useSafeAreaInsets();
  const translateY = useRef(new Animated.Value(80)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!visible) {
      return;
    }

    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        duration: 220,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 220,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 80,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => onDismiss());
    }, duration);

    return () => clearTimeout(timer);
  }, [visible, duration, onDismiss, translateY, opacity]);

  if (!visible) {
    return null;
  }

  return (
    <Animated.View
      style={[
        styles.container,
        variant === 'error' ? styles.containerError : styles.containerDefault,
        {
          bottom: 24 + insets.bottom,
          transform: [{ translateY }],
          opacity,
        },
      ]}
      pointerEvents="none"
    >
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 20,
    right: 20,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 4,
  },
  containerDefault: {
    backgroundColor: colors.ink,
  },
  containerError: {
    backgroundColor: colors.error,
  },
  text: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.surface,
    textAlign: 'center',
  },
});

export default Snackbar;
