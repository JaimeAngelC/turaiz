import { Redirect, Stack } from 'expo-router'
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { useThemeColor } from '../hooks/useThemeColor';
import { View, ViewStyle, StyleSheet } from 'react-native';
import './global.css'
import AuthProvider from '@/provider/auth-provider';
import PermissionsCheckerProvider from '@/provider/PermissionsCheckerProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  const backgroundColor = useThemeColor({}, 'background');
  const queryClient = new QueryClient();

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
    <PermissionsCheckerProvider>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <View style={{}} className='flex-1'>
            <Stack
              screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: backgroundColor },
              }}
            >
            </Stack>
          </View>
          <Toast />
        </QueryClientProvider>
      </AuthProvider>
    </PermissionsCheckerProvider>

  )
}
