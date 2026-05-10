import { createClient } from "@supabase/supabase-js";

// ✅ Ambil ENV dari .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

// ✅ Cek ENV biar gak error pas kosong
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Supabase ENV belum diisi. Cek NEXT_PUBLIC_SUPABASE_URL dan NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY di .env.local"
  );
}

// ✅ Supabase Client
export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  }
);