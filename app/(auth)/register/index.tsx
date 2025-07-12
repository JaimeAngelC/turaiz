import { View, Text, useWindowDimensions, useColorScheme, Alert, KeyboardAvoidingView, ScrollView, Pressable } from 'react-native'
import React, { useState } from 'react'

import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/presentation/components/ThemedText';
import ThemedTextInput from '@/presentation/components/ThemedTextInput';
import ThemedButton from '@/presentation/components/ThemedButton';
import { router, useNavigation } from 'expo-router';
import EmailValidator from '@/presentation/hooks/EmailValidator';
import { register } from '@/core/auth/actions/auth-actions';
import { useAuthStore } from '@/presentation/auth/store/useAuthStore';
import { useThemeColor } from '@/hooks/useThemeColor';

const RegisterScreen = () => {
    const navigation = useNavigation();
    const { height } = useWindowDimensions();
    const colorScheme = useColorScheme();
    const textColor = useThemeColor({}, 'text');
    const backgroundColor = useThemeColor({}, 'background');

    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [telefono, setTelefono] = useState('');
    const [password, setPassword] = useState('');
    const [confirmar, setConfirmar] = useState('');

    const [isPosting, setIsPosting] = useState(false);
    const { setAuthData } = useAuthStore();

    const handleRegister = async () => {
        if (nombre === '') {
            Alert.alert('Error', 'El nombre es requerido');
            return;
        }
        if (apellido === '') {
            Alert.alert('Error', 'El apellido es requerido');
            return;
        }
        if (email === '') {
            Alert.alert('Error', 'El correo es requerido');
            return;
        }
        if (telefono === '') {
            Alert.alert('Error', 'El telefono es requerido');
            return;
        }
        if (password === '') {
            Alert.alert('Error', 'La contraseña es requerido');
            return;
        }
        if (confirmar === '') {
            Alert.alert('Error', 'Confirme la contraseña');
            return;
        }
        if (!EmailValidator(email)) {
            Alert.alert('Error', 'El correo no es valido');
            return;
        }
        if (password !== confirmar) {
            Alert.alert('Error', 'Las contraseñas no coinciden');
            return;
        }

        setIsPosting(true);
        const wasSuccessful = await register(nombre, apellido, email, telefono, password);




        setIsPosting(false);
        if (wasSuccessful) {
            router.replace('/');
            setAuthData(wasSuccessful);
            return;
        }
    }

    return (
        <KeyboardAvoidingView behavior='padding' style={{ flex: 1 }}>
            <ScrollView style={{
                paddingHorizontal: 40,
                backgroundColor: backgroundColor,
            }}>
                <View style={{ position: 'absolute', marginTop: 55 }}>
                    <Pressable onPress={() => navigation.goBack()}>
                        <Ionicons
                            name='arrow-back'
                            size={24}
                            color={colorScheme === 'dark' ? 'white' : textColor}
                            style={{ marginHorizontal: 5 }}
                        />
                    </Pressable>
                </View>

                <View style={{
                    paddingTop: height * 0.15
                }}>


                    <ThemedText type='title' style={{ textAlign: 'left', fontFamily: 'KanitMedium' }}>Registro</ThemedText>
                    <View style={{ marginTop: 30 }}>
                        <ThemedTextInput
                            placeholder='Nombre'
                            keyboardType='default'
                            autoCapitalize='none'
                            icon='person'
                            value={nombre}
                            onChangeText={setNombre}

                        />

                        <ThemedTextInput
                            placeholder='Apellido'
                            keyboardType='default'
                            autoCapitalize='none'
                            icon='person-circle'
                            value={apellido}
                            onChangeText={setApellido}
                        />

                        <ThemedTextInput
                            placeholder='Email'
                            keyboardType='email-address'
                            autoCapitalize='none'
                            icon='mail'
                            value={email}
                            onChangeText={setEmail}
                        />

                        <ThemedTextInput
                            placeholder='Celular'
                            keyboardType='phone-pad'
                            autoCapitalize='none'
                            icon='phone-portrait'
                            value={telefono}
                            onChangeText={setTelefono}
                        />

                        <ThemedTextInput
                            placeholder='Contraseña'
                            secureTextEntry
                            autoCapitalize='none'
                            icon='lock-closed'
                            value={password}
                            onChangeText={setPassword}

                        />

                        <ThemedTextInput
                            placeholder='Confirmar contraseña'
                            secureTextEntry
                            autoCapitalize='none'
                            icon='lock-closed'
                            value={confirmar}
                            onChangeText={setConfirmar}
                        />
                    </View>
                    <View style={{ margin: 30 }} />
                    <ThemedButton
                        //icon='arrow-forward-outline'
                        onPress={() => {
                            handleRegister();
                        }}
                        disabled={isPosting}
                    >Registrarse</ThemedButton>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default RegisterScreen

