import { Stack } from "expo-router";

/**
 * Auth group (sign-in / sign-up). Access control is handled by the
 * `Stack.Protected` guards in the root `_layout.tsx`, so this layout only
 * defines the navigator for the two screens.
 */
export default function AuthLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
