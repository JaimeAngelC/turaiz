import { useThemeColor } from '@/hooks/useThemeColor';
import PermissionsCheckerProvider from '@/presentation/providers/PermissionsCheckerProvider';

import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';


// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();


export default function RootLayout() {
  const colorScheme = useColorScheme();
  const backgroundColor = useThemeColor({}, 'background');

  const [loaded] = useFonts({
    KanitBold: require('../assets/fonts/Kanit-Bold.ttf'),
    KanitLight: require('../assets/fonts/Kanit-Light.ttf'),
    KanitMedium: require('../assets/fonts/Kanit-Medium.ttf'),
    KanitRegular: require('../assets/fonts/Kanit-Regular.ttf'),
  });


  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView
      style={{ backgroundColor: backgroundColor, flex: 1 }}
    >
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <PermissionsCheckerProvider>
          <Stack screenOptions={{ headerShown: false, }}>
            <Stack.Screen name='(uber-app)' />
            <Stack.Screen name='(auth)' />
            <Stack.Screen name='index' />
          </Stack>
        </PermissionsCheckerProvider>
        <StatusBar style="auto" />
      </ThemeProvider>
    </GestureHandlerRootView >

  );
}
