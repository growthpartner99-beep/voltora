import { ClerkProvider, useAuth } from "@clerk/expo";
import { tokenCache } from "@clerk/expo/token-cache";
import "../../global.css";

import { Stack } from "expo-router";
import { ActivityIndicator, View } from "react-native";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY ?? "";

if (!publishableKey) {
  throw new Error("Missing EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY. Add your key to .env.local.\nRun: 1) clerk auth login  2) clerk link  3) clerk env pull — then restart the dev server.");
}

/**
 * Root navigator with Clerk route protection.
 *
 * Two `Stack.Protected` guards split every route into a signed-in group
 * `(app)` and a signed-out group (welcome `index` + the `(auth)` screens).
 * When a guard fails, Expo Router redirects to the anchor — the first screen
 * that is still available — so:
 *   - signed out  → anchor is the welcome screen,
 *   - signed in   → anchor is the protected home screen.
 *
 * We gate on `isLoaded` before reading `isSignedIn`. Clerk needs a moment to
 * restore the session from the token cache; skipping this would flash the
 * wrong screen (and redirect signed-in users to sign-in) on every cold start.
 */
function RootNavigator() {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    // Keep the launch screen up while the session is restored.
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <ActivityIndicator size="large" color="#24D4DF" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Protected app content — only while signed in. */}
      <Stack.Protected guard={isSignedIn === true}>
        <Stack.Screen name="(app)" />
      </Stack.Protected>

      {/* Onboarding + auth screens — only while signed out. */}
      <Stack.Protected guard={isSignedIn === false}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" />
      </Stack.Protected>
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <RootNavigator />
    </ClerkProvider>
  );
}
