import { View, Text } from 'react-native'
import React from 'react'
import { Slot, Stack } from 'expo-router'

const _layout = () => {
    return (
        <Stack screenOptions={{ headerShown: false, }}>
            <Stack.Screen name='home' />
            <Stack.Screen name='addresses/index' />
            <Stack.Screen name='selectServices/index' />
            <Stack.Screen name='search/index' />
        </Stack>
    )
}

export default _layout