import { View, Text, TextInput, SafeAreaView, } from 'react-native'
import React, { useRef, useState } from 'react';
import { router } from 'expo-router';
import ThemedTextInput from '@/shared/ThemedTextInput';
import ThemedTextInputPassword from '@/shared/ThemedTextInputPassword';
import { useThemeColor } from '@/hooks/useThemeColor';
import EmailValidator from '@/hooks/EmailValidator';
import FAB from '@/shared/FAB';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { User } from '@/infrastructure/interfaces/user';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuthService } from '@/services/useAuthService';
import ThemedButton from '@/shared/ThemedButton';
import Toast from 'react-native-toast-message';

const RegisterScreen = () => {
    const primaryColor = useThemeColor({}, 'primary');
    const color = useThemeColor({}, 'text');
    const [nombre, setNombre] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [email, setEmail] = useState('');
    const [telefono, setTelefono] = useState('');
    const [password, setPassword] = useState('');
    const [confirmar, setConfirmar] = useState('');
    const [focusedInput, setFocusedInput] = useState<number | null>(null);
    const nombreInputRef = useRef<TextInput | null>(null);
    const apellidoInputRef = useRef<TextInput | null>(null);
    const emailInputRef = useRef<TextInput | null>(null);
    const telefonoInputRef = useRef<TextInput | null>(null);
    const passwordInputRef = useRef<TextInput | null>(null);
    const repasswordInputRef = useRef<TextInput | null>(null);
    const [isPosting, setIsPosting] = useState(false);
    const { register } = useAuthService();

    const handleRegister = async () => {
        if (nombre === '') {
            nombreInputRef.current?.focus();
            Toast.show({ type: 'error', text1: 'Error al guardar', text2: 'El nombre es requerido', });
            return;
        }
        if (apellidos === '') {
            apellidoInputRef.current?.focus();
            Toast.show({ type: 'error', text1: 'Error al guardar', text2: 'El apellido es requerido', });
            return;
        }
        if (email === '') {
            emailInputRef.current?.focus();
            Toast.show({ type: 'error', text1: 'Error al guardar', text2: 'El correo es requerido', });
            return;
        }
        if (telefono === '') {
            telefonoInputRef.current?.focus();
            Toast.show({ type: 'error', text1: 'Error al guardar', text2: 'El telefono es requerido', });
            return;
        }
        if (password === '') {
            passwordInputRef.current?.focus();
            Toast.show({ type: 'error', text1: 'Error al guardar', text2: 'La contraseña es requerido', });
            return;
        }
        if (confirmar === '') {
            repasswordInputRef.current?.focus();
            Toast.show({ type: 'error', text1: 'Error al guardar', text2: 'Debe registrar la contraseña nuevamente', });
            return;
        }
        if (!EmailValidator(email)) {
            Toast.show({ type: 'error', text1: 'Error al guardar', text2: 'El correo no es valido', });
            return;
        }
        if (password !== confirmar) {
            Toast.show({ type: 'error', text1: 'Error al guardar', text2: 'Las contraseñas no coinciden', });
            return;
        }

        try {
            setIsPosting(true);
            const usu: User = { username: nombre, full_name: apellidos, phone: telefono, email, password, image: null }
            const { error: registrarError } = await register(usu);
            if (registrarError) {
                throw registrarError
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
              Toast.show({ type: 'error', text1: 'Error al guardar', text2: err.message });
            } else {
              Toast.show({ type: 'error', text1: 'Error al guardar', text2: 'Ha ocurrido un error desconocido' });
            }
          } finally {
            setIsPosting(false);
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, paddingHorizontal: 20, paddingTop: 30 }}>
            <FAB
                iconName={"arrow-back"}
                fill={false}
                onPress={() => { router.back(); }}
                style={{
                    top: 40,
                    left: 25,
                }}
            />

            <View className='items-center'>
                <Text className='text-3xl font-Kanit-Medium mt-4' style={{ color: color }}>Registro</Text>
            </View>

            <KeyboardAwareScrollView
                enableOnAndroid
                extraScrollHeight={50}
                contentContainerStyle={{ padding: 20, marginTop: 24 }}
            >

                <ThemedTextInput
                    icon="person"
                    focusedInput={focusedInput}
                    placeholder="Nombre"
                    onChangeText={setNombre}
                    value={nombre}
                    type='default'
                    onFocus={() => setFocusedInput(0)}
                    onBlur={() => setFocusedInput(null)}
                    setInputRef={(ref) => (nombreInputRef.current = ref)}
                    numero={0}
                />
                <View className='mt-4' />

                <ThemedTextInput
                    icon="person-circle"
                    focusedInput={focusedInput}
                    placeholder="Apellidos"
                    onChangeText={setApellidos}
                    value={apellidos}
                    onFocus={() => setFocusedInput(1)}
                    onBlur={() => setFocusedInput(null)}
                    setInputRef={(ref) => (apellidoInputRef.current = ref)}
                    numero={1}
                />
                <View className='mt-4' />

                <ThemedTextInput
                    icon="mail"
                    focusedInput={focusedInput}
                    placeholder="Correo Electronico"
                    keyboardType='email-address'
                    onChangeText={setEmail}
                    value={email}
                    type='email-address'
                    onFocus={() => setFocusedInput(2)}
                    onBlur={() => setFocusedInput(null)}
                    setInputRef={(ref) => (emailInputRef.current = ref)}
                    numero={2}
                />
                <View className='mt-4' />

                <ThemedTextInput
                    icon="phone-portrait"
                    focusedInput={focusedInput}
                    placeholder="Celular"
                    keyboardType='phone-pad'
                    onChangeText={setTelefono}
                    value={telefono}
                    type='numeric'
                    onFocus={() => setFocusedInput(3)}
                    onBlur={() => setFocusedInput(null)}
                    setInputRef={(ref) => (telefonoInputRef.current = ref)}
                    numero={3}
                />
                <View className='mt-4' />

                <ThemedTextInputPassword
                    icon="lock-closed"
                    focusedInput={focusedInput}
                    placeholder="Contraseña"
                    onChangeText={setPassword}
                    value={password}
                    onFocus={() => setFocusedInput(4)}
                    onBlur={() => setFocusedInput(null)}
                    setInputRef={(ref) => (passwordInputRef.current = ref)}
                    numero={4}
                />
                <View className='mt-4' />

                <ThemedTextInputPassword
                    icon="lock-closed"
                    focusedInput={focusedInput}
                    placeholder="Confirmar contraseña"
                    onChangeText={setConfirmar}
                    value={confirmar}
                    onFocus={() => setFocusedInput(5)}
                    onBlur={() => setFocusedInput(null)}
                    setInputRef={(ref) => (repasswordInputRef.current = ref)}
                    numero={5}
                />
                <View style={{ margin: 30 }} />

            </KeyboardAwareScrollView>

            <ThemedButton
                onPress={handleRegister}
                isPosting={isPosting}
                style={{ bottom: 80 }}
                color={primaryColor}
                name='Registrar'
            />
        </SafeAreaView>
    )
}

export default RegisterScreen

