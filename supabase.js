import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://donrczognnznatzemrcz.supabase.co";

const supabaseAnonKey = "sb_publishable_cQaYonnvojhfnZnq3jsm3g_EjcBi-Ui";

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);