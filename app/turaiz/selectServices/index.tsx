import { View, Text, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ThemedView } from '@/presentation/components/ThemedView'
import CustomMapPolyline from '@/presentation/maps/CustomMapPolyline';
import { useThemeColor } from '@/hooks/useThemeColor';
import FAB from '@/presentation/maps/FAB';
import { router } from 'expo-router';
import CustomService from '@/presentation/selectServices/CustomService';
import CustomModalService from '@/presentation/selectServices/CustomModalService';
import { returnRates } from '@/core/serviceRequest/actions/rates-actions';
// @ts-ignore
import polyline from "@mapbox/polyline";
import { Servicio } from '@/core/serviceRequest/interface/rates';
import { useTravelState } from '@/presentation/store/useTravelStore';

const ScreenServices = () => {

    const { cityOriginState, ubicationOriginState, ubicationDestinationState } = useTravelState()
    const [isLoading, setIsLoading] = useState(true);

    const [isReady, setIsReady] = useState(false);
    const [distance, setDistance] = useState<string | undefined>("");
    const [duracion, setDuracion] = useState<string | undefined>("");
    const [ruta, setRuta] = useState([]);

    //const [rates, setRates] = useState<Servicio>();

    const [servicios, setServicios] = useState<Servicio[] | undefined>();

    const [servicio, setServicio] = useState<Servicio>({ 'id': 0, 'name': "", 'tarifa': "", 'kilometer': "", 'duration': "", 'precio_referencial': "0" });


    useEffect(() => {
        const loadData = async () => {
            if (cityOriginState !== null && ubicationOriginState !== null && ubicationDestinationState !== null) {
                const response = await returnRates(cityOriginState, ubicationOriginState, ubicationDestinationState);

                const puntos = response?.results[3].puntos;
                const rates = response?.results[0].servicios;
                setServicios(rates)
                setDistance(response?.results[1].distancia);
                setDuracion(response?.results[2].duracion);


                const coordenadasRuta = polyline.decode(puntos).map(([lat, lng]: [number, number]) => ({
                    latitude: lat as number,
                    longitude: lng as number
                }));

                setRuta(coordenadasRuta);

            }
            setIsLoading(false); // Indicar que terminó de cargar

        };
        loadData();
    }, []);

    if (isLoading) {
        return (
            <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator />
            </ThemedView>
        );
    }


    return (
        <View style={{ flex: 1 }}>
            <FAB
                iconName={"arrow-back"}
                color='white'
                onPress={() => router.back()}
                style={{
                    top: 40,
                    left: 30,
                }} />

            <CustomMapPolyline rutas={ruta} inicio={ubicationOriginState!!} fin={ubicationDestinationState!!} setIsReady={setIsReady} />
            <CustomService servicios={servicios || []} setServicio={setServicio} />
            <CustomModalService servicio={servicio} distance={distance || ''} duracion={duracion || ''} setServicio={setServicio} />
        </View>
    )
}

export default ScreenServices