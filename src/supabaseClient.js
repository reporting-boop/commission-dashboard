import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  // Fails loudly in dev instead of silently returning empty data everywhere.
  console.error(
    "Missing REACT_APP_SUPABASE_URL / REACT_APP_SUPABASE_ANON_KEY — check your .env file."
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
