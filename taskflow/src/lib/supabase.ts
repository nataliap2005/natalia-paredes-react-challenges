import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_KEY;
if (!url || !key) {
  throw new Error('Configura VITE_SUPABASE_URL y VITE_SUPABASE_KEY en .env y reinicia Ionic.');
}
export const supabase = createClient(url, key, {
  auth: { autoRefreshToken: true, persistSession: true, detectSessionInUrl: false },
});
