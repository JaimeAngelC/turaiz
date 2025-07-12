import { View, KeyboardAvoidingView, StyleSheet, ActivityIndicator, TextInput, SafeAreaView, Platform, Alert, } from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { ThemedText } from "@/presentation/components/ThemedText";
import FAB from "@/presentation/maps/FAB";
import { router, useFocusEffect } from "expo-router";
import ThemedButtonLink from "@/presentation/components/ThemedButtonLink";
import Modal from "react-native-modal";
import { ThemedView } from "@/presentation/components/ThemedView";
import ThemedTextInputAddrees from "../../../presentation/components/ThemedTextInputAddrees";
import ThemedButton from "@/presentation/components/ThemedButton";
import CustomModal from "@/presentation/addresses/CustomModal";

import AddressSuggestions from "@/presentation/components/AddressSuggestions";
import { useAddressSearch } from "@/presentation/hooks/useAddressSearch";
import { useLocationStore } from "@/presentation/store/useLocationStore";

import CustomMapDestination from "@/presentation/maps/CustomMapDestination";
import { LatLng } from "@/infrastructure/interfaces/LatLng";
import { useTravelState } from "@/presentation/store/useTravelStore";
import { useThemeColor } from "@/hooks/useThemeColor";

const ScreenAddresses = () => {
  const input2Ref = useRef<TextInput | null>(null);
  const [isReady, setIsReady] = useState(false);
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const [modalVisible, setModalVisible] = useState(false);

  // sacamos datos de la ubicacion origen
  const { nameOriginState, ubicationOriginState, setNameDestinationState, setUbicationDestinationState } = useTravelState();
  /////////////////////////////////////////////////////////////////////////////////////
  const lastKnownLocation = useLocationStore((state) => state.lastKnownLocation);
  const getLocation = useLocationStore((state) => state.getLocation);

  const { suggestions, getAddressSuggestions } = useAddressSearch();

  const [streedData, setStreetData] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<LatLng | null>(null);



  useEffect(() => {
    if (!lastKnownLocation) {
      getLocation();
    }
  }, [lastKnownLocation]);

  useFocusEffect(
    useCallback(() => {
      setTimeout(() => {
        input2Ref.current?.focus();
      }, 300);
    }, [])
  );


  const verificationCordinator = () => {
    if (selectedLocation) {
      setNameDestinationState(streedData);
      setUbicationDestinationState(selectedLocation)
      router.push('/(uber-app)/selectServices');
    }
    else {
      Alert.alert('Debe registrar el destino del viaje');
    }
  }


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: backgroundColor, paddingHorizontal: 15 }}>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 5 : 0}
        style={{ flex: 1 }}
      >
        <FAB
          iconName={"arrow-back"}
          fill={false}
          onPress={() => router.back()}
          style={{
            top: 40,
            left: 25,
          }}
        />

        <View style={{ alignItems: "center" }}>
          <ThemedText
            style={{ marginTop: 50, fontSize: 20, marginBottom: 20 }}
            type="defaultSemiBold"
          >
            ¡Prepara tu viaje!
          </ThemedText>
        </View>

        <ThemedTextInputAddrees
          icon="locate-sharp"
          color={textColor}
          editable={false}
          children={nameOriginState ? nameOriginState.split(",")[0].trim() : ""}
        />

        <ThemedTextInputAddrees
          ref={input2Ref}
          icon="locate-sharp"
          color={textColor}
          children={streedData ? streedData.split(",")[0].trim() : ""}
          onChangeText={(text) => {
            getAddressSuggestions(text, ubicationOriginState);
          }}
        />

        <ThemedButtonLink
          icon="location-sharp"
          children="Seleccionar destino en mapa"
          onPress={() => setModalVisible(true)} />

        <View style={{ flex: 1, }}>

          <AddressSuggestions
            suggestions={suggestions}
            setStreetData={setStreetData}
            setSelectedLocation={setSelectedLocation} />
        </View>

        <ThemedView style={styles.container}>
          <Modal
            isVisible={modalVisible}
            onBackdropPress={() => setModalVisible(false)}
            style={styles.modalContainer}
            animationIn="slideInUp"
            animationOut="slideOutDown"
            backdropOpacity={0.7}
          >
            <ThemedView style={styles.modalView}>
              <FAB
                iconName={"close"}
                fill={true}
                color="white"
                onPress={() => setModalVisible(false)}
                style={{
                  top: 15,
                  left: 15,
                }}
              />
              {
                lastKnownLocation ? (
                  <>
                    <CustomMapDestination
                      initialLocation={lastKnownLocation}
                      streedData={streedData}
                      setStreetData={setStreetData}
                      selectedLocation={selectedLocation}
                      setSelectedLocation={setSelectedLocation}
                      setIsReady={setIsReady} />
                    <CustomModal value={isReady} close={setModalVisible} streedData={streedData} />
                  </>
                ) : (
                  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: backgroundColor }}>
                    <ActivityIndicator />
                  </View>
                )
              }
            </ThemedView>
          </Modal>
        </ThemedView>
      </KeyboardAvoidingView>

      <View style={styles.containerButton}>
        <ThemedButton children="Siguiente" onPress={() => verificationCordinator()} />
      </View>
    </SafeAreaView>
  );
};

export default ScreenAddresses;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalView: {
    width: "100%",
    height: "92%", // Modal ocupa el 80% de la pantalla
    backgroundColor: "white",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    overflow: "hidden", // Evita que el mapa sobresalga de los bordes curvos
  },
  containerButton: {
    //position: 'absolute',
    marginBottom: 20,
    //marginBottom: 20,
  },
});
