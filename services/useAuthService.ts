import { supabase } from "@/config/supabase";
import { User } from "@/infrastructure/interfaces/user";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export function useAuthService() {
  const queryClient = useQueryClient();
  // Iniciar sesión
  const login = async (email: string, password: string) => {
    const resul = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    queryClient.setQueryData(["authUser"], resul.data.user);
    return resul;
  };

  // Registrar usuario
  const register = async (usuario: User) => {
    const resul = await supabase.auth.signUp({
      email: usuario.email!,
      password: usuario.password!,
      options: {
        data: {
          username: usuario.username,
          full_name: usuario.full_name,
          phone: usuario.phone,
          avatar_url: usuario.image || "",
        },
      },
    });
    queryClient.setQueryData(["authUser"], resul.data.user);
    return resul;
  };

  // Cerrar sesión
  const logout = async () => {
    await supabase.auth.signOut();
    queryClient.clear();
  };

  const useAuthUser = () =>
    useQuery({
      queryKey: ["authUser"],
      queryFn: async () => {
        const { data, error } = await supabase.auth.getUser();
        if (error || !data.user) throw error ?? new Error("No user");
        return data.user;
      },
      staleTime: 1000 * 60 * 5, // 5 minutos
    });

  return {
    register,
    login,    
    logout,
  };
}
