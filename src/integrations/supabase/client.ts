import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

const SUPABASE_URL = "https://tqmfgzziyxzcchyeyptb.supabase.co";
const SUPABASE_PUBLISHABLE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRxbWZnenppeXh6Y2NoeWV5cHRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA5NTQ4NDksImV4cCI6MjA2NjUzMDg0OX0.FtMTIqpEOirN4vr9_7AhDW0du88xrTs-AQZKT9c6Sc0";

export const supabase = createClient<Database>(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY,
);
