import { supabase } from '@/config/supabase';
import * as ImagePicker from 'expo-image-picker';
import 'react-native-url-polyfill/auto'; // requerido por Supabase Storage en React Native

export const pickAndUploadAvatar = async (): Promise<string | null> => {
    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
    });

    if (result.canceled) return null;

    const file = result.assets[0];
    const response = await fetch(file.uri);
    const blob = await response.blob();

    const { data: userData } = await supabase.auth.getUser();
    const userId = userData.user?.id;
    if (!userId) throw new Error('No user ID');

    const filePath = `${userId}/${Date.now()}.jpg`;

    const { error, data } = await supabase.storage
        .from('avatars')
        .upload(filePath, blob, {
            contentType: 'image/jpeg',
            upsert: true,
        });

    if (error) throw error;

    const { data: publicUrlData } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

    return publicUrlData?.publicUrl ?? null;
};
