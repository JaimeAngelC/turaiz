import { supabase } from "@/config/supabase";
import { Session, User } from "@supabase/supabase-js";
import { router } from "expo-router";
import { createContext, useContext, useEffect, useState } from "react";
import Toast from "react-native-toast-message";

type AuthData = {
    user: User | null | undefined;
    loading: boolean;
    session: Session | null;
    usename: string | null;
    email: string | null;
}

const AuthContext = createContext<AuthData>({
    loading: true,
    session: null,
    user: null,
    usename: null,
    email: null,
});

interface Props {
    children: React.ReactNode;
}

export default function AuthProvider(props: Props) {
    const [loading, setLoading] = useState<boolean>(true);
    const [session, setSession] = useState<Session | null>(null);
    const [user, setUser] = useState<User | null | undefined>();
    const [usename, setUserName] = useState<string | null>('');
    const [email, setEmail] = useState<string | null>('');

    useEffect(() => {
        const verificarSesion = async () => {
            try {
                const { data, error } = await supabase.auth.getSession();
                if (error || !data.session) {
                    // Error de refresh token o sesión inválida
                    console.log("Sesión inválida o error al obtener sesión:", error?.message);
                    await supabase.auth.signOut(); // Limpia la sesión corrupta
                    router.replace("/auth/login");
                    return;
                }
                const usuario = data.session.user;
                setSession(data.session);
                setUser(usuario);
                setUserName(usuario.user_metadata.username || '');
                setEmail(usuario.email || '');
                router.replace("/inicio");
            } catch (err: any) {
                console.log("Error crítico de sesión:", err.message || err);
                Toast.show({ type: 'error', text1: 'Sesión caducada', text2: 'Por favor, vuelve a iniciar sesión.', });
                await supabase.auth.signOut();
                router.replace("/auth/login");
            } finally {
                setLoading(false);
            }
        };

        verificarSesion();

        const { data: authListener, } = supabase.auth.onAuthStateChange(async (_, session) => {
            setSession(session);
            setUser(session ? session.user : null)
            setLoading(false);

            if (session) {
                setUserName(session?.user.user_metadata.username);
                setEmail(session?.user.user_metadata.email);
                router.replace('/inicio');
            } else {
                router.replace('/auth/login');
            }
        });
        return () => {
            authListener?.subscription.unsubscribe();
        }

    }, []);
    return (
        <AuthContext.Provider value={{ user, usename, email, loading, session }} >
            {props.children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)