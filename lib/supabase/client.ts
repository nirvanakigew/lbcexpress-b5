import { createClient } from "@supabase/supabase-js"

// Check if environment variables are available
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Create a singleton instance to avoid multiple instances during development
let supabaseClient: ReturnType<typeof createClient> | null = null

export const getSupabaseClient = () => {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Supabase environment variables are missing")
    // Return a mock client or throw an error based on your preference
    return {
      from: () => ({
        select: () => ({ data: [], error: new Error("Supabase client not initialized") }),
        insert: () => ({ data: null, error: new Error("Supabase client not initialized") }),
        update: () => ({ data: null, error: new Error("Supabase client not initialized") }),
        delete: () => ({ data: null, error: new Error("Supabase client not initialized") }),
        eq: () => ({ data: null, error: new Error("Supabase client not initialized") }),
        single: () => ({ data: null, error: new Error("Supabase client not initialized") }),
        order: () => ({ data: null, error: new Error("Supabase client not initialized") }),
      }),
      auth: {
        signIn: () =>
          Promise.resolve({ user: null, session: null, error: new Error("Supabase client not initialized") }),
        signOut: () => Promise.resolve({ error: new Error("Supabase client not initialized") }),
      },
    } as any
  }

  if (!supabaseClient) {
    supabaseClient = createClient(supabaseUrl, supabaseAnonKey)
  }

  return supabaseClient
}

// Also export a direct instance for backward compatibility
export const supabase = getSupabaseClient()
