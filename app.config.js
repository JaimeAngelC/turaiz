import 'dotenv/config';

export default {
  "expo": {
    "scheme": "appturaiz",
    "name": "turaiz",
    "slug": "turaiz",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "automatic",
    "newArchEnabled": true,
    "splash": {
      "image": "./assets/splash-icon.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "softwareKeyboardLayoutMode": "resize",
      "edgeToEdgeEnabled": true,
      "permissions": [
        "CAMERA",
        "READ_EXTERNAL_STORAGE",
        "WRITE_EXTERNAL_STORAGE",
        "ACCESS_MEDIA_LOCATION"
      ],
      "config": {
        "googleMaps": {
          "apiKey": process.env.API_MAP,
        }
      }
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "extra": {
      "urlkeySupabase": process.env.EXPO_PUBLIC_SUPABASE_URL,
      "apikeySupabase": process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY
    },
    plugins: [
      [
        "expo-image-picker",
        {
          photosPermission: "Esta app necesita acceso a tus fotos",
          cameraPermission: "Esta app necesita acceso a tu cámara"
        }
      ],
      "expo-router",
    ]

  }
}