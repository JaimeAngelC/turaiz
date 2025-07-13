import { supabase } from "@/config/supabase";
import { User } from "@/infrastructure/interfaces/user";
import { useAuth } from "@/provider/auth-provider";
import { useStoreImagen } from "@/store/useCameraStore";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useImageManipulator, SaveFormat } from 'expo-image-manipulator';

export function useProfileService() {
  const { user } = useAuth();
  const imageStore = useStoreImagen(state => state.url);
  const setImageStore = useStoreImagen(state => state.guardarUrl);
  const context = useImageManipulator(imageStore || '');

  // SELECT DE LA TABLA PROFILES
  const fetchProfile = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user?.id)
      .single();
    if (error) throw new Error(error.message);
    return data;
  };
  // DEL SELECT SU TANSTACK QUERY
  const profileQuery = useQuery({
    queryKey: ['profile', user?.id],
    queryFn: fetchProfile,
    enabled: !!user?.id,
    staleTime: Infinity,
  });

  const getAvatarQuery = (path: string) => {
    return useQuery({
      queryKey: ['avatar', path],
      queryFn: async () => {
        const { data, error } = await supabase.storage.from("avatars").download(path);
        if (error) throw error;
        const reader = new FileReader();
        setImageStore('');
        return new Promise<string>((resolve, reject) => {
          reader.onloadend = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(data);
        });
      },
      enabled: !!path,
      staleTime: Infinity,
    });
  };

  const saveImageUpload = async (imageUpload: string,) => {
    if (!imageUpload) return;
    //Obtener la imagen anterior y eliminarla
    const { data: profileData, error: fetchError } = await supabase
      .from('profiles')
      .select('avatar_url')
      .eq('id', user?.id)
      .single();
    if (fetchError) throw fetchError;
    if (profileData?.avatar_url) {
      const { error: deleteError } = await supabase.storage
        .from('avatars')
        .remove([profileData.avatar_url]);
      if (deleteError) throw deleteError;
    }
    //BAJAR LA CALIDAD Y DAMOS UNA NUEVA MEDIDA DE LA IMAGEN
    const rendered = await context.resize({ width: 800 }).renderAsync();
    const result = await rendered.saveAsync({
      compress: 0.5,
      format: SaveFormat.JPEG,
    });
    //PREPARAMOS TODO PARA SUBIR LA IMAGEN A SUPABASE
    const fileExt = imageUpload.split(".").pop();
    const fileName = imageUpload.replace(/^.*[\\\/]/, "");
    const filePath = `${Date.now()}.${fileExt}`;
    const formData = new FormData();
    const photo = {
      uri: result.uri,
      name: fileName,
      type: `image/${fileExt}`,
    } as unknown as Blob;
    formData.append("file", photo);
    // SUBIMOS LA IMAGEN A LA NUBE
    const { error } = await supabase.storage
      .from("avatars")
      .upload(filePath, formData);
    if (error) throw error;
    //EDITAMOS LA URL EN LA TABLA PROFILES
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ avatar_url: filePath })
      .eq('id', user?.id);
    if (updateError) throw updateError;
  };

  const updateProfile = async (usuario: User) => {
    if (imageStore || imageStore != '') {
      await saveImageUpload(imageStore);
    }
    const { error } = await supabase
      .from("profiles")
      .update({
        username: usuario.username,
        full_name: usuario.full_name,
        phone: usuario.phone,
      })
      .eq("id", user?.id);
    if (error) throw error;
    if (usuario.email) {
      const { error: emailError } = await supabase.auth.updateUser({
        email: usuario.email,
      });
      if (emailError) throw emailError;
    }
    if (usuario.password) {
      const { error: passwordError } = await supabase.auth.updateUser({
        email: usuario.email,
        password: usuario.password,
      });
      if (passwordError) throw passwordError;
    }
  };

  const updateProfileMutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      profileQuery.refetch();
    },
    onError: (err) => {
      console.log("Error", err.message || "Error al actualizar perfil");
    }
  });

  return {
    profileQuery,
    getAvatarQuery,
    saveImageUpload,
    fetchProfile,
    updateProfileMutation
  }
}


