export const BACKEND=process.env.NODE_ENV=="production"?process.env.NEXT_PUBLIC_BACKEND_URL:"http://localhost:8000"
export const RAZOR_PAY_KEY_ID= process.env.NEXT_PUBLIC_RAZOR_PAY_KEY_ID as string;
export const RAZOR_PAY_KEY_SECRET=process.env.NEXT_PUBLIC_RAZOR_PAY_KEY_SECRET as string;
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
export const SUPABASE_PUBLIC_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLIC_ANON_KEY as string;
