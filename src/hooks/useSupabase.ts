// useSupabase.ts
import { useMemo } from 'react';

import { supabase } from './supabaseClient';

export const useSupabase = () => {
  const client = useMemo(() => supabase, []);

  return client;
};
