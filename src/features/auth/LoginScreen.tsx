import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {
  AppleIcon,
  ArrowRightIcon,
  EyeIcon,
  FaceIdIcon,
  GoogleIcon,
  LeafIcon,
  LockIcon,
  MailIcon,
  PasskeyIcon,
} from '../../components/icons/Icons';
import Snackbar from '../../components/Snackbar';
import { useLoginViewModel } from './useLoginViewModel';

const colors = {
  ink: '#1A1C1C',
  subtle: '#46464B',
  accent: '#AB3425',
  accentSoft: '#FFDAD4',
  surface: '#FFFFFF',
  surfaceMuted: '#EEEEED',
  chipBg: '#E8E8E7',
  border: '#E2E2E2',
  dividerLabelBg: '#F9F9F8',
};

function LoginScreen() {
  const {
    tab,
    setTab,
    username,
    password,
    showPassword,
    rememberMe,
    usernameError,
    passwordError,
    snackbar,
    isLoading,
    authError,
    onChangeUsername,
    onChangePassword,
    setShowPassword,
    setRememberMe,
    handleSignIn,
    dismissSnackbar,
  } = useLoginViewModel();

  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
      {/* Brand intro & visual accent header */}
      <View style={styles.header}>
        <View style={styles.badge}>
          <LeafIcon size={23} color={colors.ink} />
        </View>
        <Text style={styles.eyebrow}>MEMBER ACCESS</Text>
        <Text style={styles.title}>AURA</Text>
        <Text style={styles.subtitle}>
          Curated lifestyle & design objects. Welcome{'\n'}back to Aura.
        </Text>
      </View>

      {/* Tab switcher */}
      <View style={styles.tabSwitcher}>
        <Pressable
          style={[styles.tabButton, tab === 'signIn' && styles.tabButtonActive]}
          onPress={() => setTab('signIn')}
        >
          <Text
            style={[styles.tabText, tab === 'signIn' && styles.tabTextActive]}
          >
            Sign In
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.tabButton,
            tab === 'createAccount' && styles.tabButtonActive,
          ]}
          onPress={() => setTab('createAccount')}
        >
          <Text
            style={[
              styles.tabText,
              tab === 'createAccount' && styles.tabTextActive,
            ]}
          >
            Create Account
          </Text>
        </Pressable>
      </View>

      {/* Credentials form */}
      <View style={styles.form}>
        <View style={styles.field}>
          <View style={styles.labelRow}>
            <Text style={styles.label}>Username</Text>
            <Text style={styles.requiredLabel}>REQUIRED</Text>
          </View>
          <View
            style={[
              styles.inputWrapper,
              usernameError ? styles.inputWrapperError : null,
            ]}
          >
            <View style={styles.inputIcon}>
              <MailIcon size={17} color={colors.subtle} />
            </View>
            <TextInput
              style={styles.input}
              value={username}
              onChangeText={onChangeUsername}
              placeholder="emilys"
              placeholderTextColor={colors.subtle}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
          {usernameError ? (
            <Text style={styles.errorText}>{usernameError}</Text>
          ) : null}
        </View>

        <View style={[styles.field, styles.fieldSpacing]}>
          <View style={styles.labelRow}>
            <Text style={styles.label}>Password</Text>
            <Pressable onPress={() => {}}>
              <Text style={styles.linkText}>Forgot Password?</Text>
            </Pressable>
          </View>
          <View
            style={[
              styles.inputWrapper,
              passwordError ? styles.inputWrapperError : null,
            ]}
          >
            <View style={styles.inputIcon}>
              <LockIcon size={13} color={colors.subtle} />
            </View>
            <TextInput
              style={[styles.input, styles.passwordInput]}
              value={password}
              onChangeText={onChangePassword}
              placeholder="••••••••••••"
              placeholderTextColor={colors.subtle}
              secureTextEntry={!showPassword}
            />
            <Pressable
              style={styles.eyeButton}
              onPress={() => setShowPassword(v => !v)}
              hitSlop={8}
            >
              <EyeIcon size={18} color={colors.subtle} open={showPassword} />
            </Pressable>
          </View>
          {passwordError ? (
            <Text style={styles.errorText}>{passwordError}</Text>
          ) : null}
        </View>

        <View style={styles.rememberRow}>
          <Pressable
            style={styles.rememberLeft}
            onPress={() => setRememberMe(v => !v)}
          >
            <View
              style={[
                styles.checkbox,
                rememberMe && styles.checkboxChecked,
              ]}
            />
            <Text style={styles.rememberText}>Remember me for 30 days</Text>
          </Pressable>
          <View style={styles.secureBadge}>
            <View style={styles.secureDot} />
            <Text style={styles.secureText}>Secure Session</Text>
          </View>
        </View>
      </View>

      {/* Primary action */}
      <Pressable
        style={[styles.primaryButton, isLoading && styles.primaryButtonDisabled]}
        onPress={handleSignIn}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color={colors.surface} />
        ) : (
          <>
            <Text style={styles.primaryButtonText}>Sign In</Text>
            <View style={styles.primaryButtonArrow}>
              <ArrowRightIcon size={12} color={colors.surface} />
            </View>
          </>
        )}
      </Pressable>

      {/* Biometric quick login */}
      <Pressable style={styles.faceIdButton} onPress={() => {}}>
        <View style={styles.faceIdIconWrap}>
          <FaceIdIcon size={15} color={colors.ink} />
        </View>
        <Text style={styles.faceIdText}>Sign in with Face ID</Text>
      </Pressable>

      {/* Divider */}
      <View style={styles.dividerRow}>
        <View style={styles.dividerLine} />
        <View style={styles.dividerLabelWrap}>
          <Text style={styles.dividerLabel}>OR CONTINUE WITH</Text>
        </View>
      </View>

      {/* Social & fast login */}
      <View style={styles.socialRow}>
        <Pressable style={styles.socialButton} onPress={() => {}}>
          <AppleIcon size={20} color={colors.ink} />
          <Text style={styles.socialText}>Apple</Text>
        </Pressable>
        <Pressable style={styles.socialButton} onPress={() => {}}>
          <GoogleIcon size={20} />
          <Text style={styles.socialText}>Google</Text>
        </Pressable>
        <Pressable style={styles.socialButton} onPress={() => {}}>
          <PasskeyIcon size={16} color={colors.ink} />
          <Text style={styles.socialText}>Passkey</Text>
        </Pressable>
      </View>

      {/* Footer legal */}
      <Text style={styles.legalText}>
        By continuing you agree to Aura's{' '}
        <Text style={styles.legalLink} onPress={() => {}}>
          Terms of Service
        </Text>{' '}
        &{'\n'}
        <Text style={styles.legalLink} onPress={() => {}}>
          Privacy Policy
        </Text>
        .
      </Text>
      </ScrollView>

      <Snackbar
        visible={snackbar.visible}
        message={snackbar.message}
        variant={usernameError || passwordError || authError ? 'error' : 'default'}
        onDismiss={dismissSnackbar}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 32,
  },
  header: {
    alignItems: 'center',
    paddingBottom: 24,
  },
  badge: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.chipBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 1,
  },
  eyebrow: {
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 1,
    color: colors.accent,
    marginBottom: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    letterSpacing: -0.7,
    color: colors.ink,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.subtle,
    textAlign: 'center',
  },
  tabSwitcher: {
    flexDirection: 'row',
    backgroundColor: colors.surfaceMuted,
    borderRadius: 9999,
    padding: 4,
    marginBottom: 24,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 9999,
    alignItems: 'center',
  },
  tabButtonActive: {
    backgroundColor: colors.surface,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 1,
  },
  tabText: {
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 0.24,
    color: colors.subtle,
  },
  tabTextActive: {
    color: colors.ink,
  },
  form: {
    marginBottom: 0,
  },
  field: {},
  fieldSpacing: {
    marginTop: 16,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 0.24,
    color: colors.ink,
  },
  requiredLabel: {
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.5,
    color: colors.subtle,
  },
  linkText: {
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 0.24,
    color: colors.accent,
  },
  inputWrapper: {
    marginTop: 6,
    height: 48,
    borderRadius: 12,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 1,
  },
  inputWrapperError: {
    borderColor: colors.accent,
  },
  errorText: {
    marginTop: 6,
    fontSize: 11,
    color: colors.accent,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: colors.ink,
    padding: 0,
  },
  passwordInput: {
    marginRight: 28,
  },
  eyeButton: {
    position: 'absolute',
    right: 16,
  },
  rememberRow: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rememberLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 16,
    height: 16,
    borderRadius: 2.5,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  checkboxChecked: {
    backgroundColor: colors.ink,
    borderColor: colors.ink,
  },
  rememberText: {
    marginLeft: 10,
    fontSize: 12,
    color: colors.subtle,
  },
  secureBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.accentSoft,
    borderRadius: 9999,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  secureDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.accent,
  },
  secureText: {
    marginLeft: 4,
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.6,
    color: colors.accent,
  },
  primaryButton: {
    marginTop: 24,
    height: 50,
    borderRadius: 9999,
    backgroundColor: colors.ink,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.35,
    color: colors.surface,
  },
  primaryButtonArrow: {
    marginLeft: 8,
  },
  primaryButtonDisabled: {
    opacity: 0.7,
  },
  faceIdButton: {
    marginTop: 16,
    height: 52,
    borderRadius: 12,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 1,
  },
  faceIdIconWrap: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.surfaceMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  faceIdText: {
    marginLeft: 12,
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.24,
    color: colors.ink,
  },
  dividerRow: {
    marginTop: 24,
    marginBottom: 24,
    height: 1,
    backgroundColor: colors.border,
    justifyContent: 'center',
  },
  dividerLine: {
    height: 1,
    backgroundColor: colors.border,
  },
  dividerLabelWrap: {
    position: 'absolute',
    alignSelf: 'center',
    backgroundColor: colors.dividerLabelBg,
    paddingHorizontal: 12,
  },
  dividerLabel: {
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.5,
    color: colors.subtle,
  },
  socialRow: {
    flexDirection: 'row',
    gap: 12,
  },
  socialButton: {
    flex: 1,
    height: 60,
    borderRadius: 12,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 1,
  },
  socialText: {
    marginTop: 4,
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.6,
    color: colors.ink,
  },
  legalText: {
    marginTop: 24,
    fontSize: 12,
    lineHeight: 19.5,
    letterSpacing: 0.12,
    color: colors.subtle,
    textAlign: 'center',
  },
  legalLink: {
    color: colors.ink,
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
