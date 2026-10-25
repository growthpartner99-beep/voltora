import { Redirect } from "expo-router";

/**
 * OAuth landing route.
 *
 * A native build hands the redirect to expo-web-browser, which closes the tab
 * and returns to Clerk. Expo Go instead delivers it to the router as a deep
 * link, so every SSO sign-in lands here. Clerk has already activated the
 * session by then; the root guard decides between the app and the welcome
 * screen once we point the URL back at `/`.
 */
export default function SSOCallback() {
  return <Redirect href="/" />;
}
