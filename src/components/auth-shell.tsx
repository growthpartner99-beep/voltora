import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import type { ReactNode } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  type TextInputProps,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

/**
 * Shared building blocks for the Clerk email auth screens.
 *
 * They reuse the visual language of the welcome screen (prompts_material/
 * auth-screen-design.png): the same blue gradient, a frosted bottom-sheet
 * card, the two-tone DentaCare wordmark, and the design tokens from
 * src/theme/tokens.ts (navy / primary / muted / coral, 52px control height).
 *
 * Keeping these in one place means the sign-in and sign-up screens only
 * contain their own flow logic and stay easy to read.
 */

/** Full-screen gradient + card scaffold with a title, optional subtitle, and a back link. */
export function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  // On a cold start / deep link there's nothing to pop — fall back to the welcome screen.
  const goBack = () => {
    if (router.canGoBack()) router.back();
    else router.replace("/");
  };

  return (
    <View className="flex-1 bg-[linear-gradient(150deg,#9CCBF0_0%,#CDE7FB_45%,#E6F4FE_100%)]">
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{
            paddingTop: insets.top + 8,
            paddingBottom: insets.bottom + 24,
            flexGrow: 1,
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="mx-2 rounded-t-[24px] border-t border-white/80 bg-[linear-gradient(180deg,#DDEFFE_0%,#F0F8FE_100%)] px-6 pb-10 pt-6">
            <Pressable
              onPress={goBack}
              hitSlop={12}
              className="self-start"
              accessibilityRole="button"
              accessibilityLabel="Go back"
            >
              <Text className="text-[15px] font-semibold text-link">‹ Back</Text>
            </Pressable>

            <Text className="mt-2 text-center text-[26px] font-bold leading-[34px] text-navy">
              Denta
              <Text className="text-primary">Care</Text>
            </Text>

            <Text className="mt-5 text-center text-[24px] font-bold leading-[32px] text-navy">
              {title}
            </Text>
            {subtitle ? (
              <Text className="mt-2 text-center text-[15px] leading-[22px] text-muted">
                {subtitle}
              </Text>
            ) : null}

            {children}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

/** Labeled text input with an inline error message. */
export function AuthField({
  label,
  error,
  ...inputProps
}: { label: string; error?: string | null } & TextInputProps) {
  return (
    <View className="mt-4">
      <Text className="mb-1 text-[13px] font-semibold text-muted">{label}</Text>
      <TextInput
        placeholderTextColor="#72889A"
        className="h-[52px] w-full rounded-[16px] border border-border bg-white px-4 text-[16px] text-navy"
        {...inputProps}
      />
      {error ? (
        <Text className="mt-1 text-[13px] leading-[18px] text-coral">{error}</Text>
      ) : null}
    </View>
  );
}

/** Primary call-to-action button. Shows a spinner while busy and dims when unusable. */
export function AuthButton({
  label,
  onPress,
  busy = false,
  disabled = false,
}: {
  label: string;
  onPress: () => void;
  busy?: boolean;
  disabled?: boolean;
}) {
  const inactive = busy || disabled;

  return (
    <Pressable
      onPress={onPress}
      disabled={inactive}
      accessibilityRole="button"
      accessibilityState={{ disabled: inactive, busy }}
      className={`mt-6 h-[52px] items-center justify-center rounded-[20px] bg-primary active:opacity-80 ${
        inactive ? "opacity-50" : ""
      }`}
    >
      {busy ? (
        <ActivityIndicator color="#17324A" />
      ) : (
        <Text className="text-[16px] font-semibold text-navy">{label}</Text>
      )}
    </Pressable>
  );
}
