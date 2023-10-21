export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      contest: {
        Row: {
          archived: boolean | null
          created_at: string
          description: string | null
          end_date: string
          id: number
          start_date: string
          status: Database["public"]["Enums"]["status"]
          title: string | null
        }
        Insert: {
          archived?: boolean | null
          created_at?: string
          description?: string | null
          end_date: string
          id?: number
          start_date: string
          status?: Database["public"]["Enums"]["status"]
          title?: string | null
        }
        Update: {
          archived?: boolean | null
          created_at?: string
          description?: string | null
          end_date?: string
          id?: number
          start_date?: string
          status?: Database["public"]["Enums"]["status"]
          title?: string | null
        }
        Relationships: []
      }
      participant: {
        Row: {
          contest: number | null
          created_at: string
          email: string | null
          id: number
          outside_contest: boolean | null
          participant: string
          photo: string | null
          score: number
          title: string | null
        }
        Insert: {
          contest?: number | null
          created_at?: string
          email?: string | null
          id?: number
          outside_contest?: boolean | null
          participant: string
          photo?: string | null
          score?: number
          title?: string | null
        }
        Update: {
          contest?: number | null
          created_at?: string
          email?: string | null
          id?: number
          outside_contest?: boolean | null
          participant?: string
          photo?: string | null
          score?: number
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "participant_contest_fkey"
            columns: ["contest"]
            referencedRelation: "contest"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          email: string | null
          first_name: string | null
          id: string
          last_name: string | null
          role: Database["public"]["Enums"]["role"]
          updated_at: string | null
        }
        Insert: {
          email?: string | null
          first_name?: string | null
          id: string
          last_name?: string | null
          role?: Database["public"]["Enums"]["role"]
          updated_at?: string | null
        }
        Update: {
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          role?: Database["public"]["Enums"]["role"]
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      role: "ADMIN" | "EVALUATOR" | "OTHER"
      status: "OPEN" | "CLOSED"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
