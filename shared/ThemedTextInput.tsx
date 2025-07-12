import { View, TextInputProps, TextInput, KeyboardTypeOptions, useColorScheme } from "react-native";
import React, { useEffect, useRef } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useThemeColor } from "@/hooks/useThemeColor";
import clsx from "clsx";

interface Props extends TextInputProps {
  icon?: keyof typeof Ionicons.glyphMap;
  focusedInput?: number | null;
  onFocus?: () => void;
  onBlur?: () => void;
  setInputRef?: (ref: TextInput | null) => void;
  numero: number;
  type?: string;
}

const ThemedTextInput = ({ icon, focusedInput, onFocus, onBlur, setInputRef, numero, type = "default", ...rest }: Props) => {
  const primaryColor = useThemeColor({}, 'primary');
  const color = useThemeColor({}, 'text');
  const theme = useColorScheme();
  const internalInputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (setInputRef) {
      setInputRef(internalInputRef.current)
    }
  }, [setInputRef]);

  return (
    <View
      className={clsx('flex-row gap-3 items-center rounded-md py-2 px-4',
        focusedInput === numero ? 'border-dark-primary' : 'border-[#ccc]',
        focusedInput === numero ? 'border-[1px]' : 'border-[0.5px]',
        theme === 'dark' ? 'bg-dark-inputTextColor' : 'bg-light-inputTextColor'
      )}
      onTouchStart={() => internalInputRef.current?.focus()}
    >
      <Ionicons
        name={icon}
        size={24}
        color={focusedInput === numero ? primaryColor : color}
      />
      <TextInput

        ref={internalInputRef}
        className={clsx('font-Kanit-Regular flex-1 h-11 text-[16px]',
          theme == 'dark' ? 'text-dark-text' : 'text-light-text'
        )}
        placeholder="Correo Electronico"
        placeholderTextColor={"gray"}
        keyboardType={type as KeyboardTypeOptions}
        numberOfLines={1}
        multiline={false}
        autoCapitalize="none"
        onFocus={onFocus}
        onBlur={onBlur}
        {...rest}
      />
    </View>
  );
};

export default ThemedTextInput;
