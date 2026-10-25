import { useAuth, useUser } from '@clerk/expo';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthButton } from '../../components/auth-shell';
import { colors, radii, typography } from '../../theme/tokens';

/**
 * Home screen behind auth (plan.md Phase 2). Lessons / XP / streaks
 * land in later phases; this is the signed-in landing anchor.
 */
export default function HomeScreen() {
  const { signOut } = useAuth();
  const { user } = useUser();
  const [signingOut, setSigningOut] = useState(false);

  const handleSignOut = async () => {
    if (signingOut) return;
    setSigningOut(true);
    try {
      await signOut();
      // Session cleared: root layout guard sends the user back to welcome.
      router.replace('/');
    } catch {
      setSigningOut(false);
      Alert.alert('Sign out failed', 'Please try again.');
    }
  };

  const name =
    user?.fullName ?? user?.primaryEmailAddress?.emailAddress ?? 'there';

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.eyebrow}>Signed in</Text>
        <Text style={styles.title}>Welcome, {name}</Text>
        <Text style={styles.subtitle}>
          Your lessons, XP, and daily streak will show up here.
        </Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Daily goal</Text>
          <Text style={styles.cardBody}>
            Complete your first lesson to start a streak.
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <AuthButton label="Sign out" onPress={handleSignOut} busy={signingOut} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  eyebrow: {
    ...typography.caption,
    color: colors.link,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  title: {
    ...typography.h1,
    color: colors.navy,
    marginTop: 4,
  },
  subtitle: {
    ...typography.body,
    color: colors.muted,
    marginTop: 8,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radii.cardLg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 24,
    marginTop: 32,
  },
  cardTitle: {
    ...typography.body,
    color: colors.navy,
    fontWeight: '700',
  },
  cardBody: {
    ...typography.bodySmall,
    color: colors.muted,
    marginTop: 4,
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
});
