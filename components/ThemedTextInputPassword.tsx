import { View, Text, TextInputProps, StyleSheet, TextInput, Pressable } from 'react-native'
import React, { useRef, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useThemeColor } from '../hooks/useThemeColor';

interface Props extends TextInputProps {
    icon?: keyof typeof Ionicons.glyphMap;
    onPress?: () => void;
}

const ThemedTextInput = ({ icon, onPress, secureTextEntry, ...rest }: Props) => {
    const primaryColor = useThemeColor({}, 'primary');
    const textColor = useThemeColor({}, 'text');

    const [isActive, setIsActive] = useState(false);
    const inputRef = useRef<TextInput>(null);

    return (
        <View style={{
            ...styles.border,
            borderColor: isActive ? primaryColor : '#ccc',
        }}
            onTouchStart={() => inputRef.current?.focus}
        >
            {
                icon && (
                    <Ionicons
                        name={icon}
                        size={24}
                        color={textColor}
                        style={{ marginRight: 10 }}
                    />
                )
            }

            <>
                <TextInput
                    ref={inputRef}
                    placeholderTextColor='#5c5c5c'
                    {...rest}
                    secureTextEntry={secureTextEntry}
                    onFocus={() => setIsActive(true)}
                    onBlur={() => setIsActive(false)}
                    style={{
                        color: textColor,
                        marginRight: 10,
                        flex: 1,
                        fontFamily: 'Kanit-Regular',
                    }}
                />

                <Pressable onPress={onPress}>
                    <Ionicons name={secureTextEntry ? 'eye-off' : 'eye'} size={24} color={textColor} />
                </Pressable>
            </>
        </View>
    )
}

export default ThemedTextInput;

const styles = StyleSheet.create({
    border: {
        borderWidth: 1,
        borderRadius: 5,
        padding: 5,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center'
    }

})