export const theme = {
  colors: {
    // Material You dark surface system
    background: "#0e0e0e",
    surface: "#191a1a",
    surfaceLow: "#131313",
    surfaceHigh: "#1f2020",
    surfaceHighest: "#252626",
    surfaceBright: "#2c2c2c",
    // Primary
    primary: "#adc6ff",
    primaryContainer: "#004395",
    primaryDim: "#98b8ff",
    onPrimary: "#003d88",
    // Content
    onBackground: "#e7e5e4",
    onSurface: "#e7e5e4",
    onSurfaceVariant: "#acabaa",
    // Secondary / Tertiary
    secondary: "#9d9da4",
    secondaryContainer: "#3a3b41",
    tertiary: "#e1dcfd",
    tertiaryDim: "#c5c0e0",
    // Feedback
    error: "#ee7d77",
    outline: "#767575",
    outlineVariant: "#484848",
    // Legacy aliases kept for backward compatibility
    surfaceLight: "#252626",
    border: "#484848",
    accent: "#adc6ff",
    danger: "#ee7d77",
    success: "#4AFF8B",
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
  },
  fontSize: {
    xs: 10,
    sm: 12,
    md: 14,
    lg: 18,
    xl: 24,
    xxl: 38,
  },
} as const;
