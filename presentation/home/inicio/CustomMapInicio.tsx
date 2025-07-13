import { LatLng } from "@/infrastructure/interfaces/LatLng";
import { useEffect, useRef, useState,  } from "react";
import { View, ViewProps, StyleSheet, useColorScheme, ActivityIndicator, Image, TouchableOpacity, Text, useWindowDimensions,  } from "react-native"


import customMapStyleDarck from "@/assets//styles/mapStyleDarck.json";
import customMapStyleLick from "@/assets//styles/mapStyleLick.json";
import React from "react";
import { useLocationStore } from "@/store/useLocationStore";
import FAB from "@/shared/FAB";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { Ionicons } from '@expo/vector-icons';
import { DrawerActions, useNavigation } from '@react-navigation/native';

//const socket = io(process.env.EXPO_PUBLIC_URL);
const carIcon = require("../../../assets/images/car.png");
//const carIcon: ImageSourcePropType = require("@/assets/car.png");

interface Props extends ViewProps {
    selectedLocation: LatLng | null;
    setSelectedLocation: (value: LatLng | null) => void;
    //streedData: MutableRefObject<string>;
    //setStreetData: (value: string) => void
    setCity: (value: string | null) => void
}

const calculateBearing = (prev: LatLng, current: LatLng) => {
    const toRadians = (deg: number) => (deg * Math.PI) / 180;
    const toDegrees = (rad: number) => (rad * 180) / Math.PI;

    const lat1 = toRadians(prev.latitude);
    const lon1 = toRadians(prev.longitude);
    const lat2 = toRadians(current.latitude);
    const lon2 = toRadians(current.longitude);

    const deltaLon = lon2 - lon1;

    const y = Math.sin(deltaLon) * Math.cos(lat2);
    const x =
        Math.cos(lat1) * Math.sin(lat2) -
        Math.sin(lat1) * Math.cos(lat2) * Math.cos(deltaLon);

    return (toDegrees(Math.atan2(y, x)) + 360) % 360; // Asegurar que sea un ángulo positivo
};

const CustomMap = ({ selectedLocation, setSelectedLocation, setCity, ...rest }: Props) => {
    const navigation = useNavigation();

    const mapRef = useRef<MapView>(null);
    const colorScheme = useColorScheme();
    //const drivers = useDriverStore((state) => state.drivers);
    const { lastKnownLocation, getLocation } = useLocationStore();
    //const { drivers, listenDriverUpdates } = useDriverStore();
    //const [drivers, setDrivers] = useState<{ id: string, lat: number, lng: number, rotation: number }[]>([]);
    const [drivers, setDrivers] = useState<{ id: string; lat: number; lng: number; rotation: number }[]>([]);

    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        if (lastKnownLocation === null) {
            getLocation();
        }
    }, []);

    useEffect(() => {
        const fetchAddress = async () => {
            if (lastKnownLocation) {
                //const name_address = await nameAddress(lastKnownLocation); // api de google
                //streedData.current = name_address?.nombreUbicacion || "";
                //setCity(name_address?.dept || "");


                //streedData.current = "Calle obai";
                //setCity("Santa Cruz");

                setSelectedLocation(lastKnownLocation);

                // const getdrivers = await getDrivers(lastKnownLocation);
                // if (getdrivers) {
                //     // Suponiendo que cada conductor tiene lat y lng
                //     const driversWithRotation = getdrivers.map((driver: any) => {
                //         // Calculamos la rotación (si tienes coordenadas anteriores, puedes usarlas aquí)
                //         return {
                //             ...driver,
                //             rotation: 0, // O calculamos la rotación si tienes coordenadas anteriores
                //         };
                //     });
                //     setDrivers(driversWithRotation);
                // } else {
                //     setDrivers([]);
                // }
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

    const handleMapReady = () => {
        if (!mapRef.current) return;
        mapRef.current.animateCamera({
            center: {
                latitude: lastKnownLocation.latitude,
                longitude: lastKnownLocation.longitude,
            },
            zoom: 14,
        })
    };

    // const moveCameraToLocation = async () => {
    //     const cordinator = await getLocation();
    //     if (!mapRef.current) return;
    //     mapRef.current.animateCamera({
    //         center: cordinator,
    //     })
    // }
    console.log('render')

    return (
        <View style={{ flex: 1 }} onLayout={() => setIsReady(true)}>  

        <FAB
                iconName={"menu"}
                fill={true}
                onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                style={{
                    top: 40,
                    left: 25,
                    zIndex:1
                }}
            />

        
               {isReady && (



            <MapView style={{ flex: 1 }}
                ref={mapRef}
                //onTouchStart={() => setIsFollowingUser(false)}
                showsUserLocation={true}
                showsMyLocationButton={false}
                //cacheEnabled={true}
                //shouldRasterizeIOS={true}
                
                                
                showsCompass={true}
                provider={PROVIDER_GOOGLE}
                customMapStyle={colorScheme === 'dark' ? customMapStyleDarck : customMapStyleLick}
                initialRegion={{
                    latitude: lastKnownLocation.latitude,
                    longitude: lastKnownLocation.longitude,
                    latitudeDelta: 0.009,
                    longitudeDelta: 0.009,
                }}
                onMapReady={handleMapReady}
            > 
                {/* {drivers.map((driver) => (
                    <Marker
                        key={driver.id}
                        coordinate={{ latitude: driver.lat, longitude: driver.lng }}
                        title={`Conductor ${driver.id}`}
                        //tracksViewChanges={false}

                        anchor={{ x: 0.3, y: 0.5 }} // Centrar la imagen
                        flat // Para que se mueva de forma natural
                        //image={carIcon} // 🔥 Agregar el icono del auto
                        rotation={driver.rotation} // 🔥 Aplicar la rotación
                        style={{ width: 10, height: 10 }}
                        zIndex={1}
                    >
                        <Image source={carIcon} style={{ width: 19, height: 35 }} />
                    </Marker>
                ))} */}
             </MapView>  
            )}
            {/* <FAB
                iconName='locate-sharp'
                onPress={moveCameraToLocation}
                color='white'
                style={{
                    bottom: 250,
                    right: 20,
                }} />  */}
            
        </View>
    )
}

export default CustomMap

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'black'
    },
    map: {
        flex: 1,
        backgroundColor:'black'
    },
    pinContainer: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginLeft: -15,
        marginTop: -35,
        alignItems: 'center',
    },

    streetNameContainer: {
        position: "absolute",
        //zIndex: 1,
        width: '100%',
        height: '100%',
        alignItems: "center",
        justifyContent: 'center'
    },
    streetName: {
        padding: 5,
        marginBottom: 120,
        borderRadius: 5,
        alignItems: "center",
    },
    streetNameText: {
        color: "white",
        fontWeight: "bold",
    },
})