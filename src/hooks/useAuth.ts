import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { supabase } from '../lib/declarations/supabaseClient';

const fetchSession = async () => {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw new Error(error.message);

  return data.session;
};

export const useAuth = () => {
  const router = useRouter();

  const {
    data: session,
    isLoading,
    isError
  } = useQuery({
    queryFn: fetchSession,
    queryKey: ['user-session']
  });

  const login = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    return { data, error };
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
    router.push('/home');

    return { error };
  };

  const signUp = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({ email, password });

    return { data, error };
  };

  return {
    session,
    user: session?.user,
    isLoading,
    isError,
    login,
    logout,
    signUp
  };
};
