import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { useThemeColor } from '@/hooks/useThemeColor';

import { View } from 'react-native';
import CustomDrawer from '@/presentation/drawer/CustomDrawer';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import { Screen as NativeScreen } from 'react-native-screens';


export default function DrawerLayout() {

    const textColor = useThemeColor({}, 'text');
    const backgroundColor = useThemeColor({}, 'background');
    const colorPrimary = useThemeColor({}, 'primary')

    return (       
        <View style={{ backgroundColor }} className='flex-1'>

            <Drawer
                drawerContent={CustomDrawer}
                detachInactiveScreens={false}
                screenOptions={{
                    //sceneContainerStyle: { backgroundColor: 'transparent' },
                    //animationEnabled: false,                    
                    overlayColor: 'transparent',
                    //overlayColor: 'rgba(0,0,0,0.4)',
                    drawerActiveTintColor: colorPrimary,
                    drawerInactiveTintColor: textColor,
                    headerShadowVisible: false,
                    //drawerStatusBarAnimation: 'none',
                    sceneStyle: {
                        //backgroundColor: backgroundColor
                        backgroundColor: 'transparent',
                    },
                    drawerStyle: { backgroundColor },
                }}
            >
                <Drawer.Screen
                    name="inicio/index"
                    options={{
                        drawerLabel: 'Home',
                        title: 'Map',
                        headerShown: false,
                        drawerIcon: ({ color, size }) => (<Ionicons name='navigate-outline' size={size} color={color} />)
                    }}
                />
                <Drawer.Screen
                    name="profile/index"
                    options={{
                        drawerLabel: 'Perfil',
                        title: 'Perfil',
                        headerShown: true,
                        drawerIcon: ({ color, size }) => (<Ionicons name='person-outline' size={size} color={color} />)
                    }}
                />
                <Drawer.Screen
                    name="setting/index"
                    options={{
                        drawerLabel: 'Configuraciones',
                        title: 'Configuraciones',
                        headerShown: true,
                        drawerIcon: ({ color, size }) => (<Ionicons name='settings-outline' size={size} color={color} />)
                    }}
                />
            </Drawer>

        </View>
    );
}
