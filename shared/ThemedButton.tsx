import { View, Text, TouchableOpacity, ActivityIndicator, StyleProp, ViewStyle } from 'react-native'

interface Props {
    onPress: () => void;
    isPosting: boolean;
    style?: StyleProp<ViewStyle>;
    name: string;
    color: string;
}

const ThemedButton = ({ onPress, isPosting, style, name, color }: Props) => {
    return (
        <View className='absolute left-8 right-8 rounded-[5px] items-center' style={style}>
            <TouchableOpacity className='w-full items-center justify-center rounded-[5px] h-[60px] '
                activeOpacity={0.6}
                style={{ backgroundColor: color }}
                onPress={onPress}
                disabled={isPosting}>
                {isPosting ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text className='text-[white] text-[18px] font-Kanit-Regular'>{name}</Text>
                )}
            </TouchableOpacity>
        </View>
    )
}

export default ThemedButton