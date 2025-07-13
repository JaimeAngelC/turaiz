import { View, Text, Image, useColorScheme } from 'react-native'
import React from 'react'
import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer'
import { useProfileService } from '@/services/useProfileService';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useAuthService } from '@/services/useAuthService';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/provider/auth-provider';
import clsx from "clsx";

const CustomDrawer = (props: DrawerContentComponentProps) => {
    const { usename, email } = useAuth();
    const { logout } = useAuthService();
    const theme = useColorScheme();
    const textColor = useThemeColor({}, 'text');
    const { profileQuery, getAvatarQuery } = useProfileService();

    const { data: profile, isLoading: loadingProfile } = profileQuery;
    const { data: avatarBase64, isLoading: isLoadingImage } = getAvatarQuery(profile?.avatar_url);

    const handleLogout = async () => {
        await logout();
    };

    return (
        <DrawerContentScrollView
            {...props}
            scrollEnabled={false}
        >
            <View className='w-full items-center'>
                {!isLoadingImage && avatarBase64 ? (
                    <Image
                        className='w-[130px] h-[130px] rounded-full'
                        source={{ uri: avatarBase64 }}
                        resizeMode="cover"
                    />
                ) : (
                    <View className='w-[130px] h-[130px] rounded-full bg-gray-300' />
                )}
            </View>
            <View className='mt-4' />
            <View className='w-full items-end py-2 px-4 bg-black'>
                <Text className={clsx(theme === 'dark' ? 'text-dark-text' : 'text-light-text', 'w-full text-right')}>
                    {usename}
                </Text>
                <Text className={clsx(theme === 'dark' ? 'text-dark-text' : 'text-light-text', 'w-full text-right')}>
                    {email}
                </Text>
            </View>

            <View className='mt-4' />
            <DrawerItemList {...props} />
            <DrawerItem
                label="Salir"
                onPress={handleLogout}
                labelStyle={{ color: textColor }}
                icon={({ size }) => (
                    <Ionicons name="lock-closed-outline" size={size} color={textColor} />
                )}
            />
        </DrawerContentScrollView>
    )
}

export default CustomDrawer