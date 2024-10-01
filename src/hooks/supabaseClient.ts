// supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gtnomugolggycmbfxvql.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd0bm9tdWdvbGdneWNtYmZ4dnFsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU4NDMwMTEsImV4cCI6MjA0MTQxOTAxMX0.qLijG6GeWIUeKgulMe_vp-0MBS6OjP_Kvn8aLIRO4hc';
export const supabase = createClient(supabaseUrl, supabaseKey);
