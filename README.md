# Weather App

A minimal weather application built with React Native and Expo.

## UI Images :
<p align="center">
  <img width="400" alt="Home Screen" src="https://github.com/user-attachments/assets/674b3bec-2f0f-4378-ab70-b9813782e2d7" />
  <img width="400" alt="Weather Detail" src="https://github.com/user-attachments/assets/43cefe44-6ae4-4727-ba50-05d1c669bbbb" />
</p>

## Requirements

- Node.js 16+
- Expo CLI
- iOS Simulator or Android Emulator (or Expo Go app on physical device)

## Dependencies

```json
{
  "expo": "~51.0.0",
  "react-native": "0.74.0",
  "expo-router": "~3.5.0",
  "react-native-reanimated": "~3.10.0",
  "expo-linear-gradient": "~13.0.2",
  "@expo/vector-icons": "^14.0.0",
  "@expo-google-fonts/inter": "^0.2.3",
  "expo-font": "~12.0.0"
}
```

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npx expo start
```

3. Run the app:
- Press `a` for Android emulator
- Press `i` for iOS simulator
- Scan QR code with Expo Go app on your device

## Project Structure

```
app/
├── _layout.tsx              # Root layout
├── (tabs)/
│   ├── _layout.tsx          # Tab navigation
│   ├── index.tsx            # Home screen
│   └── explore.tsx          # Explore screen
└── modal.tsx                # Weather detail screen
components/
├── weather.api.ts           # API calls
└── weather.types.ts         # TypeScript types
```

## API

Uses Open-Meteo API (no key required):
- https://open-meteo.com/

## Commands

```bash
# Start development server
npx expo start

# Start with cache cleared
npx expo start -c

# Run on Android
npx expo start --android

# Run on iOS
npx expo start --ios

# Build for production
npx expo build
```
