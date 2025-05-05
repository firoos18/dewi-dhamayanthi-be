import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL_DEV as string,
  process.env.SUPABASE_SERVICE_ROLE_KEY_DEV as string
);

export default supabase;
