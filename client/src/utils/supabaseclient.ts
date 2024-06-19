
import { createClient } from "@supabase/supabase-js";
import {SUPABASE_PUBLIC_ANON_KEY,SUPABASE_URL} from '@/utils/constants'

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLIC_ANON_KEY);
