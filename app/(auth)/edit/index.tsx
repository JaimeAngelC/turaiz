import {
  View,
  KeyboardAvoidingView,
  ScrollView,
  Pressable,
  useWindowDimensions,
  useColorScheme,
  Image,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import MenuIconButton from "@/presentation/components/MenuIconButton";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { useAuthStore } from "@/presentation/auth/store/useAuthStore";
import { ThemedText } from "@/presentation/components/ThemedText";
import ThemedTextInput from "@/presentation/components/ThemedTextInput";
import ThemedButton from "@/presentation/components/ThemedButton";
import FAB from "@/presentation/maps/FAB";
import { ThemedView } from "@/presentation/components/ThemedView";
import { useCameraStore } from "@/presentation/store/useCameraStore";
import { useThemeColor } from "@/hooks/useThemeColor";

const EditScreen = () => {
  const { height } = useWindowDimensions();
  const colorScheme = useColorScheme();
  const textColor = useThemeColor({}, "text");
  const backgroundColor = useThemeColor({}, "background");

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [password, setPassword] = useState("");
  const [confirmar, setConfirmar] = useState("");

  const [isPosting, setIsPosting] = useState(false);
  const { setAuthData } = useAuthStore();
  const { selectedImages, clearImages } = useCameraStore();

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={{ flex: 1, backgroundColor: backgroundColor }}
    >
      <ScrollView
        style={{
          backgroundColor: backgroundColor,
        }}
      >
        <FAB
          iconName={"arrow-back"}
          onPress={() => (router.back(),
            clearImages())
          }
          fill={false}
          style={{ top: 40, left: 30 }}
        />

        <FAB
          iconName={"camera-outline"}
          onPress={() => (clearImages(),
            router.push("/(auth)/camera"))}
          fill={false}
          style={{ top: 40, right: 30 }}
        />

        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            paddingTop: height * 0.09,
            //flexDirection: "row",
          }}
        >
          <Image
            source={{ uri: selectedImages[0] }} // Imagen de prueba
            style={[styles.image, { borderColor: textColor }]}
          />
        </View>

        <ThemedView style={{ paddingHorizontal: 25, marginTop: 15 }}>
          <ThemedText
            type="title"
            style={{ textAlign: "left", fontFamily: "KanitMedium" }}
          >
            Actualizar datos
          </ThemedText>
          <View style={{ marginTop: 30 }}>
            <ThemedTextInput
              placeholder="Nombre"
              keyboardType="default"
              autoCapitalize="none"
              icon="person"
              value={nombre}
              onChangeText={setNombre}
            />

            <ThemedTextInput
              placeholder="Apellido"
              keyboardType="default"
              autoCapitalize="none"
              icon="person-circle"
              value={apellido}
              onChangeText={setApellido}
            />

            <ThemedTextInput
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              icon="mail"
              value={email}
              onChangeText={setEmail}
            />

            <ThemedTextInput
              placeholder="Celular"
              keyboardType="phone-pad"
              autoCapitalize="none"
              icon="phone-portrait-sharp"
              value={telefono}
              onChangeText={setTelefono}
            />

            <ThemedTextInput
              placeholder="Contraseña"
              secureTextEntry
              autoCapitalize="none"
              icon="lock-closed"
              value={password}
              onChangeText={setPassword}
            />

            <ThemedTextInput
              placeholder="Confirmar contraseña"
              secureTextEntry
              autoCapitalize="none"
              icon="lock-closed"
              value={confirmar}
              onChangeText={setConfirmar}
            />
          </View>
        </ThemedView>
      </ScrollView>
      <View style={{ marginBottom: 20, marginHorizontal: 15 }}>
        <ThemedButton onPress={() => { }} disabled={isPosting}>
          Guardar
        </ThemedButton>
      </View>
    </KeyboardAvoidingView>
  );
};

export default EditScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 150, // Debe ser igual al height
    height: 150,
    borderRadius: 75, // La mitad del width/height para hacerlo circular
    borderWidth: 3, // Opcional: Añadir borde
  },
});
