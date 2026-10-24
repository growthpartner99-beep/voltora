/**
 * DentaCare design tokens — single source of truth for the visual language.
 *
 * These values are mirrored in global.css (`@theme`) so Tailwind utilities
 * (bg-primary, text-navy, shadow-card, text-h1…) stay in sync with the places
 * classes can't reach: gradient color arrays, StyleSheet shadows, inline styles.
 */

export const colors = {
  primary: "#24D4DF",
  turquoise: "#26C6DA",
  cyanGlow: "#8AF5FF",
  deepBlue: "#075A92",
  navy: "#17324A",
  muted: "#72889A",
  surface: "#FFFFFF",
  background: "#F7FBFF",
  powder: "#E6F2FF",
  border: "#E6F2FF",
  success: "#34C79A",
  coral: "#FF7A6A",
  /** Inline links (legal footer). */
  link: "#0E86D8",
} as const;

export const gradients = {
  /** Page accents, headers. */
  primary: ["#C9E9F9", "#7FCBFF"] as const,
  /** Primary pill buttons. Needs expo-linear-gradient when buttons are built. */
  button: ["#24D4DF", "#26C6DA"] as const,
};

export const radii = {
  sm: 12,
  card: 16,
  cardLg: 20,
  field: 16,
  sheet: 28,
  pill: 9999,
} as const;

/** React Native shadow shape (spread is iOS-only, omitted). */
export const shadows = {
  card: {
    offset: { width: 0, height: 4 },
    blur: 16,
    opacity: 0.08,
    color: "#17324A",
  },
  floating: {
    offset: { width: 0, height: 12 },
    blur: 32,
    opacity: 0.12,
    color: "#17324A",
  },
  glow: {
    offset: { width: 0, height: 0 },
    blur: 24,
    opacity: 0.35,
    color: "#24D4DF",
  },
} as const;

/**
 * Type scale from the design system. On iOS the default font IS SF Pro,
 * so no font files are loaded — weights are applied via fontWeight.
 */
export const typography = {
  display: { fontSize: 48, lineHeight: 56, fontWeight: "700" },
  h1: { fontSize: 32, lineHeight: 40, fontWeight: "600" },
  h2: { fontSize: 24, lineHeight: 32, fontWeight: "600" },
  h3: { fontSize: 20, lineHeight: 28, fontWeight: "500" },
  title: { fontSize: 17, lineHeight: 24, fontWeight: "600" },
  body: { fontSize: 16, lineHeight: 24, fontWeight: "400" },
  bodySmall: { fontSize: 14, lineHeight: 20, fontWeight: "400" },
  caption: { fontSize: 12, lineHeight: 16, fontWeight: "400" },
  button: { fontSize: 16, lineHeight: 20, fontWeight: "600" },
  tab: { fontSize: 13, lineHeight: 16, fontWeight: "500" },
} as const;

export const dimensions = {
  /** Buttons, text inputs. */
  control: 52,
  /** Filter chips, status badges. */
  chip: 36,
  iconButton: 48,
  /** Card / input stroke. */
  hairline: 1,
  /** Line-icon stroke width. */
  iconStroke: 1.5,
} as const;
