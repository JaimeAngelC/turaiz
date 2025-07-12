import { View, Text, PressableProps, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useThemeColor } from '../hooks/useThemeColor';

interface Props extends PressableProps {
    icon?: keyof typeof Ionicons.glyphMap;
    children: string;
    disable?: boolean;
}

const ThemedButton = ({ icon, children, disable = true, ...rest }: Props) => {
    const primaryColor = useThemeColor({}, 'primary');
    const dividerColor = useThemeColor({}, 'divider');
    const disabledColor = useThemeColor({}, 'disabled');
    return (

        <Pressable
            style={({ pressed }) => [
                {
                    backgroundColor: disable
                        ? disabledColor  // Color cuando está deshabilitado
                        : pressed
                            ? primaryColor + '95'
                            : primaryColor,
                },
                styles.button,
            ]}
            disabled={disable}
            {...rest}

        >
            <Text style={{ color: disable ? dividerColor : 'white', fontSize: 18 }}>{children}</Text>
            {
                icon && (
                    <Ionicons
                        name={icon}
                        size={24}
                        color={'white'}
                        style={{ marginHorizontal: 5 }}
                    />
                )
            }
        </Pressable>

    )
}

export default ThemedButton

const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 10,
        paddingVertical: 19,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        borderRadius: 5
    }

})