import { useSSO } from "@clerk/expo/experimental";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

/**
 * Welcome / sign-in screen — first onboarding screen (plan.md Phase 2).
 *
 * Visual source of truth: prompts_material/auth-screen-design.png.
 * Hero art: assets/images/auth-hero.png. Apple / Google / lock glyphs are
 * extracted from the same reference, since no icon library is installed.
 *
 * Apple / Google use Clerk's OAuth SSO flow; email auth lives on the
 * (auth) sign-up / sign-in screens.
 */

const CARD_MARGIN = 8;
const BUTTON_RADIUS = 20;

export default function Welcome() {
  const insets = useSafeAreaInsets();
  const { startSSOFlow } = useSSO();
  const [ssoProvider, setSsoProvider] = useState<
    "apple" | "google" | null
  >(null);
  const [ssoError, setSsoError] = useState<string | null>(null);

  const ssoBusy = ssoProvider !== null;

  const handleSSO = async (provider: "apple" | "google") => {
    if (ssoBusy) return;
    setSsoProvider(provider);
    setSsoError(null);
    const t0 = Date.now();
    const mark = (phase: string) =>
      console.log(`[SSO ${provider}] ${phase} @ +${Date.now() - t0}ms`);
    mark("tapped — opening flow");
    try {
      // Session is activated automatically; the root layout guard
      // navigates into the app.
      const result = await startSSOFlow({
        strategy: provider === "apple" ? "oauth_apple" : "oauth_google",
      });
      mark(
        `flow returned — session=${result.createdSessionId ?? "null"} browser=${
          result.authSessionResult?.type ?? "n/a"
        }`,
      );
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      mark(`threw — ${message}`);
      if (__DEV__) console.warn(`SSO (${provider}) failed:`, err);
      setSsoError(
        `Could not continue with ${
          provider === "apple" ? "Apple" : "Google"
        }: ${message}`,
      );
    } finally {
      setSsoProvider(null);
    }
  };

  return (
    <View className="flex-1 bg-[linear-gradient(150deg,#9CCBF0_0%,#CDE7FB_45%,#E6F4FE_100%)]">
      <StatusBar style="dark" />

      {/* Hero illustration — fills the area above the card */}
      <View className="absolute inset-x-0 top-0 h-[50%] items-center justify-start overflow-hidden">
        <Image
          source={require("../../assets/images/auth-hero.png")}
          contentFit="contain"
          style={{ width: "120%", aspectRatio: 1536 / 1024, marginTop: 78 }}
          alt=""
        />
      </View>

      {/* Bottom sheet card */}
      <View
        className="mt-auto rounded-t-[24px] border-t border-white/80 bg-[linear-gradient(180deg,#DDEFFE_0%,#F0F8FE_100%)] px-6 pb-10 pt-10"
        style={{
          marginLeft: CARD_MARGIN,
          marginRight: CARD_MARGIN,
          marginBottom: insets.bottom,
        }}
      >
        {/* Wordmark */}
        <Text className="text-center text-[34px] font-bold leading-[42px] text-navy">
          Denta
          <Text className="text-primary">Care</Text>
        </Text>

        {/* Headline */}
        <Text className="mt-5 text-center text-[28px] font-bold leading-[38px] text-navy">
          Care for your smile,{"\n"}without the phone call
        </Text>

        {/* Subtitle */}
        <Text className="mt-4 text-center text-[15px] leading-[22px] text-muted">
          Modern dental care, made easy.
        </Text>

        {/* Continue with Apple */}
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Continue with Apple"
          accessibilityState={{ disabled: ssoBusy, busy: ssoProvider === "apple" }}
          disabled={ssoBusy}
          onPress={() => handleSSO("apple")}
          className="relative mt-4 h-[52px] flex-row items-center justify-center bg-black active:opacity-80"
          style={{ borderRadius: BUTTON_RADIUS, opacity: ssoBusy ? 0.6 : 1 }}
        >
          <Image
            source={require("../../assets/images/apple-logo.png")}
            contentFit="contain"
            style={{ position: "absolute", left: 46, height: 23, width: 20 }}
            alt=""
          />
          <Text className="text-[16px] font-semibold text-white">
            Continue with Apple
          </Text>
        </Pressable>

        {/* Continue with Google */}
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Continue with Google"
          accessibilityState={{ disabled: ssoBusy, busy: ssoProvider === "google" }}
          disabled={ssoBusy}
          onPress={() => handleSSO("google")}
          className="relative mt-[14px] h-[52px] flex-row items-center justify-center bg-white shadow-card active:opacity-80"
          style={{ borderRadius: BUTTON_RADIUS, opacity: ssoBusy ? 0.6 : 1 }}
        >
          <Image
            source={require("../../assets/images/google-g.png")}
            contentFit="contain"
            style={{ position: "absolute", left: 45, height: 24, width: 24 }}
            alt=""
          />
          <Text className="text-[16px] font-semibold text-navy">
            Continue with Google
          </Text>
        </Pressable>

        {ssoError ? (
          <Text className="mt-3 text-center text-[13px] leading-[18px] text-red-600">
            {ssoError}
          </Text>
        ) : null}

        {/* Email auth entry points */}
        <Link href="/sign-up" asChild>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Sign up with email"
            disabled={ssoBusy}
            className="mt-[14px] h-[52px] items-center justify-center border border-navy/15 bg-white/60 active:opacity-80"
            style={{ borderRadius: BUTTON_RADIUS, opacity: ssoBusy ? 0.6 : 1 }}
          >
            <Text className="text-[16px] font-semibold text-navy">
              Sign up with email
            </Text>
          </Pressable>
        </Link>

        <View className="mt-4 flex-row items-center justify-center">
          <Text className="text-[13px] leading-[18px] text-muted">
            Already have an account?{" "}
          </Text>
          <Link href="/sign-in" replace>
            <Text className="text-[13px] font-semibold leading-[18px] text-link">
              Sign in
            </Text>
          </Link>
        </View>

        {/* Legal footer */}
        <View className="mt-6 items-center">
          <View className="flex-row items-center gap-1.5">
            <Image
              source={require("../../assets/images/lock.png")}
              contentFit="contain"
              className="h-[15px] w-[13px]"
              alt=""
            />
            <Text className="text-[13px] leading-[18px] text-muted">
              By continuing, you agree to our
            </Text>
          </View>
          <Text className="mt-1 text-[13px] font-semibold leading-[18px] text-muted">
            <Text className="text-link">Privacy Policy</Text> and{" "}
            <Text className="text-link">Terms of Use</Text>
          </Text>
        </View>
      </View>
    </View>
  );
}
