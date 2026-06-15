import { createClient } from '@supabase/supabase-js';

export type Message = {
  id: number;
  created_at: string;
  content: string;
};

interface Database {
  public: {
    Tables: {
      portal_messages: {
        Row: Message;
        Insert: {
          content: string;
        };
        Update: {
          content?: string;
        };
        Relationships: [];
      };
    };
    Views: {};
    Functions: {};
    Enums: {};
    CompositeTypes: {};
  };
}

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY');
}

export const supabase = createClient<Database, 'public'>(supabaseUrl, supabaseAnonKey);
