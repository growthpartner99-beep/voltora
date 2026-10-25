import { useSignIn } from "@clerk/expo";
import { Link } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { AuthButton, AuthField, AuthShell } from "@/components/auth-shell";

/**
 * Sign-in screen — email + password.
 *
 * Clerk custom flow (Core 3 "future" resource):
 *   1. signIn.password({ emailAddress, password }) → checks signIn.status
 *   2. 'complete' → signIn.finalize() activates the session
 *   3. 'needs_second_factor' / 'needs_client_trust' → email code via
 *      signIn.mfa.sendEmailCode() / signIn.mfa.verifyEmailCode()
 *
 * After finalize(), the session is set and the Stack.Protected guard in
 * _layout.tsx automatically routes the user into the protected (app) group.
 */
export default function SignIn() {
  const { signIn, errors, fetchStatus } = useSignIn();
  const codeSentRef = useRef(false);

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  // True once credentials were accepted and a second check (2FA / device trust) needs an email code.
  const [pendingCode, setPendingCode] = useState(false);

  const busy = fetchStatus === "fetching";
  const globalError = errors.global?.[0]?.message;

  // A secondary verification can only be sent once per attempt.
  useEffect(() => {
    if (pendingCode && !codeSentRef.current) {
      codeSentRef.current = true;
      signIn.mfa.sendEmailCode().then(({ error }) => {
        if (error) codeSentRef.current = false;
      });
    }
  }, [pendingCode, signIn]);

  // Step 1: submit credentials, then either finish or fall into the code step.
  const onSubmitCredentials = async () => {
    const { error } = await signIn.password({ emailAddress, password });
    if (error) return; // surfaced inline via errors.fields / errors.global

    if (signIn.status === "complete") {
      await signIn.finalize();
      // Guard in _layout.tsx redirects to the protected group once signed in.
      return;
    }
    if (signIn.status === "needs_second_factor" || signIn.status === "needs_client_trust") {
      setPendingCode(true);
    }
  };

  // Step 2: verify the secondary email code and finish the sign-in.
  const onVerifyCode = async () => {
    const { error } = await signIn.mfa.verifyEmailCode({ code });
    if (error) return;

    if (signIn.status === "complete") {
      await signIn.finalize();
    }
  };

  return (
    <AuthShell
      title={pendingCode ? "Check your email" : "Welcome back"}
      subtitle={
        pendingCode
          ? `For your security, we sent a code to ${emailAddress}.`
          : "Sign in to pick up your lessons right where you stopped."
      }
    >
      {globalError ? (
        <Text className="mt-4 text-[13px] leading-[18px] text-coral">{globalError}</Text>
      ) : null}

      {pendingCode ? (
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
          <AuthButton label="Verify code" onPress={onVerifyCode} busy={busy} disabled={!code} />
          <Pressable
            onPress={() => signIn.mfa.sendEmailCode()}
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
            error={errors.fields.identifier?.message}
          />
          <AuthField
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="Your password"
            secureTextEntry
            autoComplete="password"
            textContentType="password"
            error={errors.fields.password?.message}
          />
          <AuthButton
            label="Sign in"
            onPress={onSubmitCredentials}
            busy={busy}
            disabled={!emailAddress || !password}
          />
        </>
      )}

      <View className="mt-6 flex-row items-center justify-center">
        <Text className="text-[14px] text-muted">New to Voltora? </Text>
        <Link href="/sign-up" replace>
          <Text className="text-[14px] font-semibold text-link">Create account</Text>
        </Link>
      </View>
    </AuthShell>
  );
}
