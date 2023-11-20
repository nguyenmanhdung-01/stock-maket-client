import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://hvqphkctlpxrryjjubdm.supabase.co";

const supabaseKey =
  process.env.SUPABASE_SERCRET ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh2cXBoa2N0bHB4cnJ5amp1YmRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDAxNTE4MTUsImV4cCI6MjAxNTcyNzgxNX0.MeDYkzis_f1N9iPKwDVy6GhPgIj_s9v45FX7ImqdG34";
export const supabase = createClient(supabaseUrl, supabaseKey);
