import { View, Text } from 'react-native'
import React from 'react'
import ThemedButton from '@/presentation/components/ThemedButton';
import { router } from 'expo-router';
import { useAuthStore } from '@/presentation/auth/store/useAuthStore';

const ScreenSetting = () => {
    const { token, user, loadAuthData, setAuthData, logout } = useAuthStore();


    return (
        <View>
            <Text>ScreenSetting</Text>
            <ThemedButton
                onPress={() => {
                    logout();
                    router.replace('/(auth)/login');
                }}>
                Cerrar Seccion
            </ThemedButton>
        </View>
    )
}

export default ScreenSetting