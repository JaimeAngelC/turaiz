import { View, Text, TouchableOpacity, Platform } from 'react-native'
import React, { useRef, useState } from 'react'
import { useThemeColor } from '@/hooks/useThemeColor';
import { router } from 'expo-router';
import CustomMapInicio from '@/presentation/home/inicio/CustomMapInicio';
import { LatLng } from '@/infrastructure/interfaces/LatLng';

import { useAuth } from '@/provider/auth-provider';
import { useAuthService } from '@/services/useAuthService';


const ScreenHome = () => {
    const primaryColor = useThemeColor({}, 'primary');
    const [selectedLocation, setSelectedLocation] = useState<LatLng | null>(null);
    const [city, setCity] = useState<string | null>(null);
    const streedData = useRef<string>("");
    const { logout } = useAuthService();

    const { user, usename } = useAuth();

    
    return (
        <View className="flex-1">

                                    
            <CustomMapInicio
                selectedLocation={selectedLocation}
                setSelectedLocation={setSelectedLocation}
                //todo para el nombre de la calle
                //streedData={streedData}
                //setStreetData={setStreetData}
                setCity={setCity}
            />


            {/* <Text className="text-white text-8xl font-bold text-center">HOME</Text> */}
            {/* <View className='absolute bottom-20 left-8 right-8 rounded-[5px] items-center'>
                <TouchableOpacity className='w-full items-center justify-center rounded-[5px] p-5'
                    activeOpacity={0.6}
                    style={{ backgroundColor: primaryColor, }}
                    onPress={() => router.push('/auth/profile')}
                >
                    <Text className='text-[white] text-[18px] font-Kanit-Regular'>Profile</Text>
                </TouchableOpacity>
                <View style={{ padding: 6 }} />

                <TouchableOpacity className='w-full items-center justify-center rounded-[5px] p-5'
                    activeOpacity={0.6}
                    style={{ backgroundColor: primaryColor, }}
                    onPress={() => handleSalir()}
                >
                    <Text className='text-[white] text-[18px] font-Kanit-Regular'>Salir</Text>
                </TouchableOpacity>
            </View> */}

        </View>
    )
}

export default ScreenHome