/** @type {import('tailwindcss').Config} */
import { Colors } from './constants/Colors'
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./shared/**/*.{js,jsx,ts,tsx}",
    "./app/global.css"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        light: {
          text: Colors.light.text,
          background: Colors.light.background,
          tint: Colors.light.tint,
          icon: Colors.light.icon,
          tabIconDefault: Colors.light.tabIconDefault,
          tabIconSelected: Colors.light.tabIconSelected,
          primary: Colors.light.primary,
          ruta: Colors.light.ruta,
          selected: Colors.light.selected,
          textSecundary: Colors.light.textSecundary,
          divider: Colors.light.divider,
          disabled: Colors.light.disabled,
          inputTextColor: Colors.light.textInput
        },
        dark: {
          text: Colors.dark.text,
          background: Colors.dark.background,
          tint: Colors.dark.tint,
          icon: Colors.dark.icon,
          tabIconDefault: Colors.dark.tabIconDefault,
          tabIconSelected: Colors.dark.tabIconSelected,
          primary: Colors.dark.primary,
          ruta: Colors.dark.ruta,
          selected: Colors.dark.selected,
          textSecundary: Colors.dark.textSecundary,
          divider: Colors.dark.divider,
          disabled: Colors.dark.disabled,
          inputTextColor: Colors.dark.textInput
        }
      },

      fontFamily: {
        'Kanit-Bold': ['KanitBold', 'Kanit'],
        'Kanit-Light': ['KanitLight', 'Kanit'],
        'Kanit-Medium': ['KanitMedium', 'Kanit'],
        'Kanit-Regular': ['KanitRegular', 'Kanit'],
      }
    },
  },
  plugins: [],
}

