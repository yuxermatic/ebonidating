import { createClient } from "@supabase/supabase-js"

const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL || import.meta.env.SUPABASE_SUPABASE_NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.SUPABASE_NEXT_PUBLIC_SUPABASE_ANON_KEY_ANON_KEY || ""

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "[Supabase] Configuration missing. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables.",
  )
}

export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true,
          storage: typeof window !== "undefined" ? window.localStorage : undefined,
        },
        global: {
          headers: {
            "x-application-name": "eboni-dating",
          },
        },
      })
    : null

export const isSupabaseConfigured = () => Boolean(supabase)

export const checkSupabaseConnection = async () => {
  if (!supabase) {
    return { connected: false, error: "Supabase not configured" }
  }

  try {
    const { data, error } = await supabase.auth.getSession()
    return { connected: true, error: null, session: data.session }
  } catch (error) {
    return { connected: false, error: String(error) }
  }
}
