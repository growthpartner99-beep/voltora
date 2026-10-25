import { Stack } from "expo-router";

/**
 * Protected app group. The signed-in guard lives in the root `_layout.tsx`;
 * this layout only defines the navigator for authenticated screens.
 */
export default function AppLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
