import { View, Text, Alert, SafeAreaView, ActivityIndicator, TextInput, Image } from 'react-native'
import React, { memo, useEffect, useRef, useState } from 'react'
import { useThemeColor } from '@/hooks/useThemeColor';
import { router } from 'expo-router';
import FAB from '@/shared/FAB';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ThemedTextInput from '@/shared/ThemedTextInput';
import ThemedTextInputPassword from '@/shared/ThemedTextInputPassword';
import EmailValidator from '@/hooks/EmailValidator';
import { User } from '@/infrastructure/interfaces/user';
import { useStoreImagen } from '@/store/useCameraStore';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useProfileService } from '@/services/useProfileService';
import ThemedButton from '@/shared/ThemedButton';
import Toast from 'react-native-toast-message';
import { useAuth } from '@/provider/auth-provider';


const ScreenProfile = memo(() => {
    const primaryColor = useThemeColor({}, 'primary');
    const textColor = useThemeColor({}, "text");
    const color = useThemeColor({}, 'text');
    const { email } = useAuth();
    const [nombre, setNombre] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [email1, setEmail1] = useState(email);
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

    const imageStore = useStoreImagen(state => state.url);

    const { profileQuery, getAvatarQuery, updateProfileMutation } = useProfileService();

    const { data: profile, isLoading: loadingProfile } = profileQuery;
    const { mutate, isPending } = updateProfileMutation;

    const { data: avatarBase64, isLoading: isLoadingImage } = getAvatarQuery(profile?.avatar_url);


    useEffect(() => {
        if (profile) {
            setNombre(profile.username);
            setApellidos(profile.full_name);
            setTelefono(profile.phone);
        }
    }, [profile]);

    const handleEditar = async () => {
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
        // if (email === '') {
        //     emailInputRef.current?.focus();
        //     Alert.alert('Error', 'El correo es requerido');
        //     return;
        // }
        if (telefono === '') {
            telefonoInputRef.current?.focus();
            Toast.show({ type: 'error', text1: 'Error al guardar', text2: 'El telefono es requerido', });
            return;
        }
        // if (password === '') {
        //     passwordInputRef.current?.focus();
        //     Alert.alert('Error', 'La contraseña es requerido');
        //     return;
        // }
        // if (confirmar === '') {
        //     repasswordInputRef.current?.focus();
        //     Alert.alert('Error', 'Confirme la contraseña');
        //     return;
        // }
        if (!EmailValidator(email1!)) {
            Toast.show({ type: 'error', text1: 'Error al guardar', text2: 'El correo no es valido', });
            return;
        }
        if (password !== confirmar) {
            Toast.show({ type: 'error', text1: 'Error al guardar', text2: 'Las contraseñas no coinciden', });
            return;
        }

        try {

            const usu: User = { username: nombre, full_name: apellidos, phone: telefono }
            mutate({
                username: usu.username,
                full_name: usu.full_name,
                phone: usu.phone,
            });
            if (!isPending) {
                Toast.show({
                    type: 'success',
                    text1: 'Perfil guardado',
                    text2: 'Tu información ha sido actualizada.',
                });
            }

        } catch (err: any) {
            Alert.alert('Error', err.message);
        } finally {

        }
    };

    const getImageSource = () => {
        if (imageStore && imageStore !== '') {
            return { uri: imageStore };
        }
        return { uri: avatarBase64 };
    };

    if (loadingProfile) {
        return (
            <View className='justify-center items-center flex-1'>
                <ActivityIndicator color={textColor} />
            </View>
        )
    }

    return (
        <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 30 }}>
            <FAB
                iconName={"arrow-back"}
                fill={false}
                onPress={() => { router.back(); }}
                style={{
                    top: 40,
                    left: 25,
                }}
            />

            <FAB
                iconName={"camera-sharp"}
                onPress={() => router.push("camara")}
                fill={false}
                style={{ top: 40, right: 30 }}
            />
            <View className='items-center'>
                <Text className='text-3xl mt-4 font-Kanit-Medium' style={{ color: color }}>Editar</Text>
            </View>

            <KeyboardAwareScrollView
                enableOnAndroid
                extraScrollHeight={130}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ padding: 20, alignItems: 'center' }}
            >
                <View className='bg-gray-200 w-[130px] h-[130px] rounded-full justify-center items-center'>
                    <>
                        <Image
                            className='w-full h-full rounded-full absolute'
                            source={getImageSource()}
                            resizeMode="cover"
                        />
                        {isLoadingImage || imageStore && (
                            <View
                                className='w-full h-full rounded-full'
                                style={{
                                    backgroundColor: 'rgba(255,255,255,0.7)', // blanco transparente
                                }}
                            />
                        )}
                    </>

                </View>

                <View className='mt-4' />

                <ThemedTextInput
                    icon="person"
                    focusedInput={focusedInput}
                    placeholder="Nombre"
                    onChangeText={setNombre}
                    value={nombre}
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
                    onChangeText={setEmail1}
                    value={email1!}
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
                    onFocus={() => setFocusedInput(3)}
                    onBlur={() => setFocusedInput(null)}
                    setInputRef={(ref) => (telefonoInputRef.current = ref)}
                    numero={3}
                />
                <View className='mt-4' />

                <ThemedTextInputPassword
                    icon="lock-closed"
                    focusedInput={focusedInput}
                    placeholder="Nueva Contraseña"
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
                onPress={handleEditar}
                isPosting={isPending}
                style={{ bottom: 80 }}
                color={primaryColor}
                name='Guardar'
            />
        </View>
    )
})

export default ScreenProfile