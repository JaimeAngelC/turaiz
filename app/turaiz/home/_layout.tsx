import { View, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Redirect } from 'expo-router'
import { useAuthStore } from '@/presentation/auth/store/useAuthStore';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import DrawerNavigator from '@/presentation/drawer/Navigator/CustomDrawerNavigator';
import { useThemeColor } from '@/hooks/useThemeColor';



const _layout = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { token, loadAuthData } = useAuthStore();
  const backgroundColor = useThemeColor({}, 'background');


  useEffect(() => {
    const loadData = async () => {
      await loadAuthData(); // Cargar datos al iniciar
      setIsLoading(false); // Indicar que terminó de cargar
    };
    loadData();
  }, []);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 5,
        }}
      >
        <ActivityIndicator />
      </View>
    );
  }

  if (!token) {
    return <Redirect href={'/(auth)/login'} />
  }
  return (

    <GestureHandlerRootView style={{ flex: 1, backgroundColor: backgroundColor }}>
      <DrawerNavigator />
    </GestureHandlerRootView>

  )
}

export default _layout