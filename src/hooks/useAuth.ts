import { Session, User } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

import { supabase } from './supabaseClient';

export const useAuth = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Function to get the initial session
    const fetchSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      setUser(data.session?.user || null);
    };

    fetchSession();

    // Subscribe to authentication state changes
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_, session) => {
      setSession(session);
      setUser(session?.user || null);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    return { data, error };
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();

    return { error };
  };

  const signUp = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({ email, password });

    return { data, error };
  };

  return { session, user, login, logout, signUp };
};
