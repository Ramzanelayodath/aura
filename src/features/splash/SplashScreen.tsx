import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { LeafIcon } from '../../components/icons/Icons';
import { useSplashViewModel } from './useSplashViewModel';

const colors = {
  ink: '#1A1C1C',
  subtle: '#46464B',
  surface: '#FFFFFF',
  chipBg: '#E8E8E7',
};

function SplashScreen() {
  useSplashViewModel();

  return (
    <View style={styles.screen}>
      <View style={styles.badge}>
        <LeafIcon size={28} color={colors.ink} />
      </View>
      <Text style={styles.title}>AURA</Text>
      <ActivityIndicator style={styles.spinner} color={colors.subtle} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
  },
  badge: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.chipBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    letterSpacing: -0.6,
    color: colors.ink,
    marginBottom: 24,
  },
  spinner: {
    marginTop: 8,
  },
});

export default SplashScreen;
