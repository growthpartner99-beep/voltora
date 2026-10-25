import { useSignUp } from "@clerk/expo";
import { Link } from "expo-router";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { AuthButton, AuthField, AuthShell } from "@/components/auth-shell";

/**
 * Sign-up screen — email + password, then an email verification code.
 *
 * Clerk custom flow (Core 3 "future" resource):
 *   1. signUp.password({ emailAddress, password })
 *   2. signUp.verifications.sendEmailCode()
 *   3. signUp.verifications.verifyEmailCode({ code })
 *   4. when signUp.status === "complete", signUp.finalize() activates the session.
 *
 * After finalize(), the session is set and the Stack.Protected guard in
 * _layout.tsx automatically routes the user into the protected (app) group.
 */
export default function SignUp() {
  const { signUp, errors, fetchStatus } = useSignUp();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  // True once we've submitted credentials and are waiting on the email code.
  const [pendingVerification, setPendingVerification] = useState(false);

  const busy = fetchStatus === "fetching";

  // Step 1 → 2: create the account and send a verification code to the email.
  const onSubmitCredentials = async () => {
    const { error } = await signUp.password({ emailAddress, password });
    if (error) return; // surfaced inline via errors.fields / errors.global

    const { error: codeError } = await signUp.verifications.sendEmailCode();
    if (codeError) return;

    setPendingVerification(true);
  };

  // Step 3 → 4: verify the code and activate the new session.
  const onVerifyCode = async () => {
    const { error } = await signUp.verifications.verifyEmailCode({ code });
    if (error) return;

    if (signUp.status === "complete") {
      await signUp.finalize();
      // Guard in _layout.tsx redirects to the protected group once signed in.
    }
  };

  // Any non-field error (e.g. form-level issues) worth showing at the top.
  const globalError = errors.global?.[0]?.message;

  return (
    <AuthShell
      title={pendingVerification ? "Check your email" : "Create your account"}
      subtitle={
        pendingVerification
          ? `We sent a 6-digit code to ${emailAddress}.`
          : "Care for your smile, without the phone call."
      }
    >
      {globalError ? (
        <Text className="mt-4 text-[13px] leading-[18px] text-coral">{globalError}</Text>
      ) : null}

      {pendingVerification ? (
        <>
          <AuthField
            label="Verification code"
            value={code}
            onChangeText={setCode}
            placeholder="123456"
            keyboardType="number-pad"
            autoComplete="sms-otp"
            textContentType="oneTimeCode"
            error={errors.fields.code?.message}
          />
          <AuthButton label="Verify email" onPress={onVerifyCode} busy={busy} disabled={!code} />
          <Pressable
            onPress={() => signUp.verifications.sendEmailCode()}
            disabled={busy}
            hitSlop={8}
            className="mt-4 self-center"
            accessibilityRole="button"
          >
            <Text className="text-[14px] font-semibold text-link">I need a new code</Text>
          </Pressable>
        </>
      ) : (
        <>
          <AuthField
            label="Email address"
            value={emailAddress}
            onChangeText={setEmailAddress}
            placeholder="you@example.com"
            autoCapitalize="none"
            autoComplete="email"
            keyboardType="email-address"
            textContentType="emailAddress"
            error={errors.fields.emailAddress?.message}
          />
          <AuthField
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="Create a password"
            secureTextEntry
            autoComplete="password-new"
            textContentType="newPassword"
            error={errors.fields.password?.message}
          />
          <AuthButton
            label="Sign up"
            onPress={onSubmitCredentials}
            busy={busy}
            disabled={!emailAddress || !password}
          />
        </>
      )}

      <View className="mt-6 flex-row items-center justify-center">
        <Text className="text-[14px] text-muted">Already have an account? </Text>
        <Link href="/sign-in" replace>
          <Text className="text-[14px] font-semibold text-link">Sign in</Text>
        </Link>
      </View>
    </AuthShell>
  );
}
