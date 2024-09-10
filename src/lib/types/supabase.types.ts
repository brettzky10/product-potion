export type Json =
  | string        
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      _discountToproduct: {
        Row: {
          A: string
          B: string
        }
        Insert: {
          A: string
          B: string
        }
        Update: {
          A?: string
          B?: string
        }
        Relationships: [
          {
            foreignKeyName: "_discountToproduct_A_fkey"     
            columns: ["A"]
            isOneToOne: false
            referencedRelation: "discount"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "_discountToproduct_B_fkey"     
            columns: ["B"]
            isOneToOne: false
            referencedRelation: "product"
            referencedColumns: ["id"]
          },
        ]
      }
      billings: {
        Row: {
          amount: number
          daysWithService: number
          expiryDate: string | null
          id: string
          ownerId: string | null
          plan: Database["public"]["Enums"]["plans"]        
          subscribed: boolean
        }
        Insert: {
          amount?: number
          daysWithService?: number
          expiryDate?: string | null
          id: string
          ownerId?: string | null
          plan?: Database["public"]["Enums"]["plans"]       
          subscribed?: boolean
        }
        Update: {
          amount?: number
          daysWithService?: number
          expiryDate?: string | null
          id?: string
          ownerId?: string | null
          plan?: Database["public"]["Enums"]["plans"]       
          subscribed?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "billings_ownerId_fkey"
            columns: ["ownerId"]
            isOneToOne: false
            referencedRelation: "owner"
            referencedColumns: ["id"]
          },
        ]
      }
      discount: {
        Row: {
          allProducts: boolean
          code: string
          createdAt: string
          discountAmount: number
          discountType: Database["public"]["Enums"]["discountCodeType"]
          expiresAt: string | null
          id: string
          isActive: boolean
          limit: number | null
          storeId: string | null
          uses: number
        }
        Insert: {
          allProducts?: boolean
          code: string
          createdAt?: string
          discountAmount: number
          discountType: Database["public"]["Enums"]["discountCodeType"]
          expiresAt?: string | null
          id: string
          isActive?: boolean
          limit?: number | null
          storeId?: string | null
          uses?: number
        }
        Update: {
          allProducts?: boolean
          code?: string
          createdAt?: string
          discountAmount?: number
          discountType?: Database["public"]["Enums"]["discountCodeType"]
          expiresAt?: string | null
          id?: string
          isActive?: boolean
          limit?: number | null
          storeId?: string | null
          uses?: number
        }
        Relationships: []
      }
      owner: {
        Row: {
          createdAt: string
          email: string | null
          id: string
          name: string | null
          stripeId: string | null
          updatedAt: string
        }
        Insert: {
          createdAt?: string
          email?: string | null
          id: string
          name?: string | null
          stripeId?: string | null
          updatedAt: string
        }
        Update: {
          createdAt?: string
          email?: string | null
          id?: string
          name?: string | null
          stripeId?: string | null
          updatedAt?: string
        }
        Relationships: []
      }
      product: {
        Row: {
          createdAt: string
          description: string
          embedding: string | null
          id: string
          imagePath: string
          isAvailableForPurchase: boolean
          name: string
          priceInCents: number
          storeId: string
          tokens: number | null
          updatedAt: string
        }
        Insert: {
          createdAt?: string
          description?: string
          embedding?: string | null
          id: string
          imagePath: string
          isAvailableForPurchase?: boolean
          name: string
          priceInCents: number
          storeId: string
          tokens?: number | null
          updatedAt: string
        }
        Update: {
          createdAt?: string
          description?: string
          embedding?: string | null
          id?: string
          imagePath?: string
          isAvailableForPurchase?: boolean
          name?: string
          priceInCents?: number
          storeId?: string
          tokens?: number | null
          updatedAt?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_storeId_fkey"
            columns: ["storeId"]
            isOneToOne: false
            referencedRelation: "store"
            referencedColumns: ["id"]
          },
        ]
      }
      store: {
        Row: {
          createdAt: string
          id: string
          name: string
          ownerId: string
          subdomain: string
          updatedAt: string
        }
        Insert: {
          createdAt?: string
          id: string
          name: string
          ownerId: string
          subdomain: string
          updatedAt: string
        }
        Update: {
          createdAt?: string
          id?: string
          name?: string
          ownerId?: string
          subdomain?: string
          updatedAt?: string
        }
        Relationships: [
          {
            foreignKeyName: "store_ownerId_fkey"
            columns: ["ownerId"]
            isOneToOne: false
            referencedRelation: "owner"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      binary_quantize:
        | {
            Args: {
              "": string
            }
            Returns: unknown
          }
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
      halfvec_avg: {
        Args: {
          "": number[]
        }
        Returns: unknown
      }
      halfvec_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      halfvec_send: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      halfvec_typmod_in: {
        Args: {
          "": unknown[]
        }
        Returns: number
      }
      hnsw_bit_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      hnsw_halfvec_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      hnsw_sparsevec_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      hnswhandler: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      ivfflat_bit_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      ivfflat_halfvec_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      ivfflathandler: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      l2_norm:
        | {
            Args: {
              "": unknown
            }
            Returns: number
          }
        | {
            Args: {
              "": unknown
            }
            Returns: number
          }
      l2_normalize:
        | {
            Args: {
              "": string
            }
            Returns: string
          }
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
      sparsevec_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      sparsevec_send: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      sparsevec_typmod_in: {
        Args: {
          "": unknown[]
        }
        Returns: number
      }
      vector_avg: {
        Args: {
          "": number[]
        }
        Returns: string
      }
      vector_dims:
        | {
            Args: {
              "": string
            }
            Returns: number
          }
        | {
            Args: {
              "": unknown
            }
            Returns: number
          }
      vector_norm: {
        Args: {
          "": string
        }
        Returns: number
      }
      vector_out: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      vector_send: {
        Args: {
          "": string
        }
        Returns: string
      }
      vector_typmod_in: {
        Args: {
          "": unknown[]
        }
        Returns: number
      }
    }
    Enums: {
      discountCodeType: "PERCENTAGE" | "FIXED"
      plans: "STANDARD" | "PRO" | "ULTIMATE"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] 
&
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]        
    : never