import { View, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from 'expo-router'
import CustomMap from '@/presentation/maps/CustomMap'
import { DrawerNavigationProp } from '@react-navigation/drawer'
import FAB from '@/presentation/maps/FAB'
import CustomOrigin from '@/presentation/origin/CustomOrigin'
import { useLocationStore } from '@/presentation/store/useLocationStore'
import { LatLng } from '@/infrastructure/interfaces/LatLng'
import { useThemeColor } from '@/hooks/useThemeColor'
import CustomMapInicio from '@/presentation/maps/CustomMapInicio'
import { nameAddress } from '@/core/addressRequest/nameAddress/actions/nameAddress-actions'

type RootDrawerParamList = {
  'welcome/index': undefined;
  'reserve/index': undefined;
};

const HomeScreen = React.memo(() => {
  const background = useThemeColor({}, 'background');
  const { lastKnownLocation, getLocation } = useLocationStore();
  type DrawerNavigationProps = DrawerNavigationProp<RootDrawerParamList>;

  const navigation = useNavigation<DrawerNavigationProps>();

  const [streedData, setStreetData] = useState<string>("");
  const [city, setCity] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<LatLng | null>(null); 
    
  useEffect(() => {
    if (lastKnownLocation === null) {
      getLocation();
    }
  }, []);


    useEffect(() => {
       const fetchAddress = async () => {
            if (lastKnownLocation) {
                const name_address = await nameAddress(lastKnownLocation);                       
                setStreetData(name_address?.nombreUbicacion || "");
                setCity(name_address?.dept || "");
                setSelectedLocation(lastKnownLocation);
            }
        };
     if (lastKnownLocation) {
        fetchAddress();
     }
 }, [lastKnownLocation]);

  if (lastKnownLocation === null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <FAB
        iconName={'menu'}
        color='white'
        onPress={() => navigation.openDrawer()}
        style={{
          top: 40,
          left: 30,
        }} />
      {/* <CustomMap
        //// todo para las coordenadas
        initialLocation={lastKnownLocation}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
        //todo para el nombre de la calle
        streedData={streedData}
        setStreetData={setStreetData}
        setCity={setCity}
        setIsReady={setIsReady}
      /> */}
      <CustomMapInicio
        //// todo para las coordenadas   
        initialLocation={lastKnownLocation}     
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
        //todo para el nombre de la calle
        streedData={streedData}
        setStreetData={setStreetData}
        setCity={setCity}        
      />
      <CustomOrigin        
        streedData={streedData}
        selectedLocation={selectedLocation}
        city={city}
      />
    </View>
  )
})

export default HomeScreen

