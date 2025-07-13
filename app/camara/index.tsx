import { View, Image, Alert } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { CameraType, CameraView, FlashMode, Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import ThemedButtonC from '@/shared/ThemedButtonC';
import ThemedButtonG from '@/shared/ThemedButtonG';
import { router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker'
import { useStoreImagen } from '@/store/useCameraStore';
import 'react-native-url-polyfill/auto';

import ThemedButton from '@/shared/ThemedButton';
import { useThemeColor } from '@/hooks/useThemeColor';


const ScreenPrincipal = () => {
    const primaryColor = useThemeColor({}, 'primary');
    const secundaryColor = useThemeColor({}, 'tabIconDefault');

    const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
    const [image, setImage] = useState<string | null>(null);
    const [imageUpload, setImageUpload] = useState<string | null>(null);
    const [type, setType] = useState<CameraType>('back');
    const [flash, setFlash] = useState<FlashMode>('off');
    const cameraRef = useRef<CameraView | null>(null);
    const [layoutReady, setLayoutReady] = useState(false);
    const setImagenesStore = useStoreImagen(state => state.guardarUrl);


    useEffect(() => {
        (async () => {
            MediaLibrary.requestPermissionsAsync();
            const cameraStatus = await Camera.requestMicrophonePermissionsAsync();
            setHasCameraPermission(cameraStatus.status === 'granted')
        })();
    }, []);

    const takePicture = async () => {
        if (cameraRef) {
            try {
                if (cameraRef.current) {
                    const data = await cameraRef.current.takePictureAsync();
                    setImage(data.uri);
                    setImageUpload(data.uri);
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    const saveImage = async () => {
        if (image) {
            try {
                await MediaLibrary.createAssetAsync(image);
                setImage(null); // BORRAMOS PARA QUE EL VIEW YA SE MUESTRE
                //saveImageUpload();// SUBIMOS A SUPABASE
                setImagenesStore(imageUpload!);
            } catch (error) {
                console.log(error);
            }
            router.dismiss();
        }
    }

    const handredflash = () => {
        setFlash(current => current === 'off' ? 'on' : 'off');
    }

    const handredReverse = () => {
        setType(current => current === 'back' ? 'front' : 'back')
    }

    const pickImageAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [5, 5],
            quality: 1,
        });
        if (result.canceled) return;
        result.assets.forEach((asset) => {
            setImage(asset.uri);
            setImageUpload(asset.uri)
        });
    }

    return (
        <View style={{ flex: 1}}>
            {
                !image ? (
                    <View style={{ flex: 1 }} onLayout={() => setLayoutReady(true)}>
                        {
                        layoutReady && (
                        <>
                        <CameraView style={{ flex: 1 }}
                            facing={type}
                            flash={flash}
                            ref={cameraRef}
                        />
                        {/* BOTON ATRAS */}
                        <ThemedButtonC
                            onPress={() => router.back()}
                            iconName='arrow-back-sharp'
                            style={{ position: 'absolute', top: 40, left: 32 }}
                        />
                        {/* BOTON PARA FLASH */}
                        <ThemedButtonC
                            onPress={handredflash}
                            iconName='flash-sharp'
                            style={{ position: 'absolute', top: 40, right: 32 }}
                            color={flash === 'off' ? 'cyan' : 'yellow'}
                        />
                        </>
                        )
                    }

                    </View>
                ): (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Image
                            source={{ uri: image }}
                            //style={{ flex: 1 }}
                            className='bg-slate-50 h-[380px] w-full rounded-3xl'
                            resizeMode="cover"
                        />
                    </View>
                )
            }
            <View style={{ paddingVertical: 20 }}>
                {
                    image ? (
                        <>
                            {/* BOTON PARA VOLVER A SACAR FOTO */}
                            <ThemedButton
                                onPress={saveImage}
                                isPosting={false}
                                style={{ bottom: 150 }}
                                color={primaryColor}
                                name='Seleccionar Foto'
                            />
                            {/* BOTON PARA GUARDAR */}
                            <ThemedButton
                                onPress={() => setImage(null)}
                                isPosting={false}
                                style={{ bottom: 80 }}
                                color={secundaryColor}
                                name='Cancelar'
                            />
                        </>
                    ): (
                        <>
                            {/* BOTON PARA ABRIR IMAGENES GUARDADAS */}
                            <ThemedButtonC
                                onPress={pickImageAsync}
                                iconName='images-sharp'
                                style={{ position: 'absolute', bottom: 60, left: 32 }}
                            />
                            {/* BOTON PARA TOMAR LA FOTO */}
                            <ThemedButtonG
                                onPress={takePicture}
                            />
                            {/* BOTON PARA VOLTEAR LA CAMARA */}
                            <ThemedButtonC
                                onPress={handredReverse}
                                iconName='repeat-sharp'
                                style={{ position: 'absolute', bottom: 60, right: 32 }}
                                color={type === 'back' ? 'cyan' : 'yellow'}
                            />
                        </>
                    )
                }
            </View>
        </View >
    )
}

export default ScreenPrincipal




