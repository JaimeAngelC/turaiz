import { View, KeyboardAvoidingView, useWindowDimensions, ScrollView, Pressable, Alert } from 'react-native'
import React, { useState } from 'react'
import { router } from 'expo-router';

import { authLogin } from '@/core/auth/actions/auth-actions';
import { useAuthStore } from '@/presentation/auth/store/useAuthStore';
import ThemedTextInput from '@/presentation/components/ThemedTextInput';
import ThemedButton from '@/presentation/components/ThemedButton';
import ThemedLink from '@/presentation/components/ThemedLink';
import { ThemedText } from '@/presentation/components/ThemedText';
import ThemedTextInputPassword from '@/presentation/components/ThemedTextInputPassword';
import { useThemeColor } from '@/hooks/useThemeColor';


const LoginScreen = () => {
    const { height } = useWindowDimensions();
    const backgroundColor = useThemeColor({}, 'background');
    const { setAuthData } = useAuthStore();
    const [showPassword, setShowPassword] = useState(false);

    const [isPosting, setIsPosting] = useState(false);
    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    const onLogin = async () => {
        const { email, password } = form;
        if (email.length === 0 || password.length === 0) {
            return;
        }
        setIsPosting(true)

        const wasSuccessful = await authLogin(form.email, form.password);
        setIsPosting(false);

        if (wasSuccessful) {
            //<Redirect href={'/'}/>
            router.replace('/');
            setAuthData(wasSuccessful);
            return;
        }
        Alert.alert('Error', 'Usuario o contraseña no son correctos')

    }


    return (
        <KeyboardAvoidingView behavior='padding' style={{ flex: 1 }}>
            <ScrollView
                style={{
                    paddingHorizontal: 40,
                    backgroundColor: backgroundColor,
                }}>

                <View style={{
                    paddingTop: height * 0.35
                }}>
                    <ThemedText type='title' style={{ textAlign: 'center', fontFamily: 'KanitRegular' }}>Uber SuLu</ThemedText>
                    <ThemedText style={{ color: 'grey', textAlign: 'center', fontFamily: 'KanitRegular' }}>Login to your account</ThemedText>
                </View>

                <View style={{ marginTop: 20 }}>
                    <ThemedTextInput
                        placeholder='Correo electronico'
                        keyboardType='email-address'
                        autoCapitalize='none'
                        icon='mail'
                        onChangeText={(value) => setForm({ ...form, email: value })}
                        value={form.email}
                    />


                    <ThemedTextInputPassword
                        placeholder='Contraseña'
                        autoCapitalize='none'
                        secureTextEntry={!showPassword} // Pasamos el estado
                        icon='lock-closed'
                        onChangeText={(value) => setForm({ ...form, password: value })}
                        value={form.password}
                        onPress={() => setShowPassword(!showPassword)}

                    />

                </View>

                <View style={{ marginTop: 10 }} />
                <ThemedButton
                    //icon='arrow-forward-outline'
                    onPress={() => {
                        //handleLogin();
                        onLogin();

                    }}
                    disabled={isPosting}
                >Ingresar</ThemedButton>

                <View style={{ margin: 50 }} />


                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <ThemedText>¿No tienes cuenta?</ThemedText>

                    <Pressable style={{ marginHorizontal: 5 }}
                    //onPress={() => navigation.navigate('RegisterScreen')}
                    >
                        <ThemedLink
                            href={'/(auth)/register'} style={{ marginHorizontal: 5 }}>
                            Crear Cuenta
                        </ThemedLink>

                    </Pressable>


                </View>
            </ScrollView>

        </KeyboardAvoidingView >

    )
};
export default LoginScreen;



