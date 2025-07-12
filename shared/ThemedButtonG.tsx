import { useWindowDimensions, TouchableOpacity, StyleSheet, StyleProp, ViewStyle } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';

interface Props {
    onPress: () => void;
    iconName?: keyof typeof Ionicons.glyphMap;
    style?: StyleProp<ViewStyle>;
}

const ButtonCamara = ({ onPress, iconName, style }: Props) => {
    const dimensions = useWindowDimensions();
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.shutterButton, { left: dimensions.width / 2 - 32 }]}
        ></TouchableOpacity>
    )
}

export default ButtonCamara

const styles = StyleSheet.create({
    shutterButton: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: 'white',
        borderWidth: 6,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 60,
        borderColor: 'cyan',
    },

});