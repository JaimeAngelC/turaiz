import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { ThemedView } from '@/presentation/components/ThemedView'
import LottieView from 'lottie-react-native';

const ScreenSearch = () => {
    return (
        <ThemedView style={styles.container}>
            <LottieView
                source={require('../../../assets/images/radar.json')} // Ruta al archivo JSON
                autoPlay
                loop
                style={styles.animation}
            />
        </ThemedView>
    )
}

export default ScreenSearch

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    animation: {
        width: '100%',
        height: '100%',
    },
});