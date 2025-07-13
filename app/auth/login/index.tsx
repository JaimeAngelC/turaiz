import { View, Text, ActivityIndicator, TextInput, ScrollView, Pressable, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { router } from 'expo-router';
import { useThemeColor } from '@/hooks/useThemeColor';
import ThemedTextInput from '@/shared/ThemedTextInput';
import ThemedTextInputPassword from '@/shared/ThemedTextInputPassword';
import { useAuthService } from '@/services/useAuthService';
import ThemedButton from '@/shared/ThemedButton';
import Toast from 'react-native-toast-message';


const ScreenLogin = () => {
    const primaryColor = useThemeColor({}, 'primary');
    const color = useThemeColor({}, 'text');
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isPosting, setIsPosting] = useState(false);
    const [focusedInput, setFocusedInput] = useState<number | null>(null);
    const emailInputRef = useRef<TextInput | null>(null);
    const passwordInputRef = useRef<TextInput | null>(null);
    const [error, setError] = useState<string | null>(null);
    const { login } = useAuthService();

    const handleIngresar = async () => {
        if (email === '') {
            emailInputRef.current?.focus();
            Toast.show({ type: 'error', text1: 'Error al Iniciar', text2: 'El correo es requerido', });
            return;
        }
        if (password === '') {
            passwordInputRef.current?.focus();
            Toast.show({ type: 'error', text1: 'Error al Iniciar', text2: 'La contraseña es requerido', });
            return;
        }

        try {
            setIsPosting(true);
            setError(null);
            const { error: loginError } = await login(email, password)
            if (loginError) {
                throw loginError
            }
        } catch (error: any) {
            Toast.show({ type: 'error', text1: 'Error al Iniciar', text2: error.message, });
        } finally {
            setIsPosting(false);
        }
    }

    return (
        <ScrollView
            contentContainerStyle={{
                flexGrow: 1,
                marginTop: 180,
                paddingHorizontal: 40,
                paddingBottom: 40,
            }}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="on-drag"
        >

            <View className='items-center mb-10'>
                <Text className='text-[50px] font-Kanit-Medium' style={{ color: color }}>Uber SuLu</Text>
                <Text className='text-[grey] text-center text-[18px] font-Kanit-Regular'>Login to your account</Text>
            </View>

            <View className='mt-18' />

            <View>
                <ThemedTextInput
                    icon="mail"
                    focusedInput={focusedInput}
                    placeholder="Correo Electrónico"
                    keyboardType="email-address"
                    onChangeText={setEmail}
                    value={email}
                    onFocus={() => setFocusedInput(0)}
                    onBlur={() => setFocusedInput(null)}
                    setInputRef={(ref) => (emailInputRef.current = ref)}
                    numero={0}
                />

                <View className='mt-4' />

                <ThemedTextInputPassword
                    icon="lock-closed"
                    focusedInput={focusedInput}
                    placeholder="Contraseña"
                    onChangeText={setPassword}
                    value={password}
                    onFocus={() => setFocusedInput(1)}
                    onBlur={() => setFocusedInput(null)}
                    setInputRef={(ref) => (passwordInputRef.current = ref)}
                    numero={1}
                />
            </View>

            <View className='flex-row justify-center items-center mt-5'>
                <Text className='text-[16px] font-Kanit-Light' style={{ color: color }}>¿No tienes cuenta?</Text>
                <Pressable style={{ marginHorizontal: 5 }}
                    onPress={() => router.push('/auth/register')}
                >
                    <Text style={{ color: primaryColor }} className='text-[16px] font-Kanit-Light px-2'>Crear Cuenta</Text>
                </Pressable>
            </View>

            <ThemedButton
                onPress={() => handleIngresar()}
                isPosting={isPosting}
                style={{ bottom: 80 }}
                color={primaryColor}
                name='Ingresar'
            />


        </ScrollView >
    )
}

export default ScreenLogin