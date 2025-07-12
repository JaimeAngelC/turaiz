import { Pressable, StyleProp, ViewStyle } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useThemeColor } from '../hooks/useThemeColor';

interface Props {
    iconName: keyof typeof Ionicons.glyphMap;
    onPress: () => void;
    style?: StyleProp<ViewStyle>;
    fill?: boolean;
    color?: string;
}

const FAB = ({ onPress, style, iconName, fill = true, color }: Props) => {
    const primaryColor = useThemeColor({}, 'primary');
    const textColor = useThemeColor({}, 'text');

    return (
        <Pressable className="z-0 absolute h-[40px] w-[40px] rounded-full justify-center items-center" style={[style, fill ? { backgroundColor: primaryColor } : { }]}
            onPress={onPress}
        >
            <Ionicons name={iconName} color={color ? color : textColor} size={25} />
        </Pressable>       
    )
}

export default FAB;