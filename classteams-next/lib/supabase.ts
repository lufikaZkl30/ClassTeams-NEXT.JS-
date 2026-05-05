import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

// 🔍 TEST
console.log("URL:", supabaseUrl);
console.log("KEY:", supabaseAnonKey);

// 🧑‍💻 Inisialisasi Supabase Client
export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);

