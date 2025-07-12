import { View, Text, useWindowDimensions, TouchableOpacity, StyleSheet, StyleProp, ViewStyle } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';

interface Props {
    iconName?: keyof typeof Ionicons.glyphMap;
    onPress: () => void;
    style?: StyleProp<ViewStyle>;
    color?: string;
}

const ButtonCamara = ({ onPress, iconName, style, color = 'cyan' }: Props) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={style}
            className='px-[10px] py-[10px] items-center justify-center rounded-full bg-[#16365c]'
        >
            <Ionicons name={iconName} size={25} color={color} />
        </TouchableOpacity>
    )
}

export default ButtonCamara
