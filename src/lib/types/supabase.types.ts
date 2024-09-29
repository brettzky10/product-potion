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
      affiliate: {
        Row: {
          createdAt: string
          id: string
          ownerId: string | null
        }
        Insert: {
          createdAt?: string
          id: string
          ownerId?: string | null
        }
        Update: {
          createdAt?: string
          id?: string
          ownerId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "affiliate_ownerId_fkey"
            columns: ["ownerId"]
            isOneToOne: false
            referencedRelation: "owner"
            referencedColumns: ["id"]
          },
        ]
      }
      billings: {
        Row: {
          amount: number
          cancel_at: string | null
          cancel_at_period_end: string | null
          canceled_at: string | null
          card_brand: string | null
          card_last4: string | null
          created: string | null
          current_period_end: string | null
          current_period_start: string | null
          daysWithService: number
          endDate: string | null
          ended_at: string | null
          id: string
          metadata: Json | null
          ownerId: string
          payment_method_id: string | null
          period: Database["public"]["Enums"]["period"] | null
          plan: Database["public"]["Enums"]["plans"]
          startDate: string
          status: Database["public"]["Enums"]["status"] | null
          subscribed: boolean
          trial_end: string | null
          trial_start: string | null
          userId: string
        }
        Insert: {
          amount?: number
          cancel_at?: string | null
          cancel_at_period_end?: string | null
          canceled_at?: string | null
          card_brand?: string | null
          card_last4?: string | null
          created?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          daysWithService?: number
          endDate?: string | null
          ended_at?: string | null
          id: string
          metadata?: Json | null
          ownerId: string
          payment_method_id?: string | null
          period?: Database["public"]["Enums"]["period"] | null
          plan?: Database["public"]["Enums"]["plans"]
          startDate?: string
          status?: Database["public"]["Enums"]["status"] | null
          subscribed?: boolean
          trial_end?: string | null
          trial_start?: string | null
          userId: string
        }
        Update: {
          amount?: number
          cancel_at?: string | null
          cancel_at_period_end?: string | null
          canceled_at?: string | null
          card_brand?: string | null
          card_last4?: string | null
          created?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          daysWithService?: number
          endDate?: string | null
          ended_at?: string | null
          id?: string
          metadata?: Json | null
          ownerId?: string
          payment_method_id?: string | null
          period?: Database["public"]["Enums"]["period"] | null
          plan?: Database["public"]["Enums"]["plans"]
          startDate?: string
          status?: Database["public"]["Enums"]["status"] | null
          subscribed?: boolean
          trial_end?: string | null
          trial_start?: string | null
          userId?: string
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
      category: {
        Row: {
          createdAt: string
          id: string
          name: string
          storeId: string
          updatedAt: string
        }
        Insert: {
          createdAt?: string
          id: string
          name: string
          storeId: string
          updatedAt: string
        }
        Update: {
          createdAt?: string
          id?: string
          name?: string
          storeId?: string
          updatedAt?: string
        }
        Relationships: [
          {
            foreignKeyName: "category_storeId_fkey"
            columns: ["storeId"]
            isOneToOne: false
            referencedRelation: "store"
            referencedColumns: ["id"]
          },
        ]
      }
      color: {
        Row: {
          createdAt: string
          id: string
          name: string
          storeId: string
          updatedAt: string
          value: string
        }
        Insert: {
          createdAt?: string
          id: string
          name: string
          storeId: string
          updatedAt: string
          value: string
        }
        Update: {
          createdAt?: string
          id?: string
          name?: string
          storeId?: string
          updatedAt?: string
          value?: string
        }
        Relationships: [
          {
            foreignKeyName: "color_storeId_fkey"
            columns: ["storeId"]
            isOneToOne: false
            referencedRelation: "store"
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
          storeId: string
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
          storeId: string
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
          storeId?: string
          uses?: number
        }
        Relationships: [
          {
            foreignKeyName: "discount_storeId_fkey"
            columns: ["storeId"]
            isOneToOne: false
            referencedRelation: "store"
            referencedColumns: ["id"]
          },
        ]
      }
      order: {
        Row: {
          address: string
          createdAt: string
          discountCodeId: string | null
          id: string
          isPaid: boolean
          ownerId: string
          phone: string
          storeId: string
          updatedAt: string
        }
        Insert: {
          address?: string
          createdAt?: string
          discountCodeId?: string | null
          id: string
          isPaid?: boolean
          ownerId: string
          phone?: string
          storeId: string
          updatedAt: string
        }
        Update: {
          address?: string
          createdAt?: string
          discountCodeId?: string | null
          id?: string
          isPaid?: boolean
          ownerId?: string
          phone?: string
          storeId?: string
          updatedAt?: string
        }
        Relationships: [
          {
            foreignKeyName: "order_discountCodeId_fkey"
            columns: ["discountCodeId"]
            isOneToOne: false
            referencedRelation: "discount"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_ownerId_fkey"
            columns: ["ownerId"]
            isOneToOne: false
            referencedRelation: "owner"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_storeId_fkey"
            columns: ["storeId"]
            isOneToOne: false
            referencedRelation: "store"
            referencedColumns: ["id"]
          },
        ]
      }
      orderItem: {
        Row: {
          id: string
          orderId: string
          productId: string
        }
        Insert: {
          id: string
          orderId: string
          productId: string
        }
        Update: {
          id?: string
          orderId?: string
          productId?: string
        }
        Relationships: [
          {
            foreignKeyName: "orderItem_orderId_fkey"
            columns: ["orderId"]
            isOneToOne: false
            referencedRelation: "order"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orderItem_productId_fkey"
            columns: ["productId"]
            isOneToOne: false
            referencedRelation: "product"
            referencedColumns: ["id"]
          },
        ]
      }
      owner: {
        Row: {
          connectedAccountId: string | null
          createdAt: string
          customerId: string | null
          email: string | null
          id: string
          isPrintfulLinked: boolean
          linkCode: string | null
          name: string | null
          stripeConnectedLinked: boolean
          updatedAt: string
          userId: string
        }
        Insert: {
          connectedAccountId?: string | null
          createdAt?: string
          customerId?: string | null
          email?: string | null
          id: string
          isPrintfulLinked?: boolean
          linkCode?: string | null
          name?: string | null
          stripeConnectedLinked?: boolean
          updatedAt: string
          userId: string
        }
        Update: {
          connectedAccountId?: string | null
          createdAt?: string
          customerId?: string | null
          email?: string | null
          id?: string
          isPrintfulLinked?: boolean
          linkCode?: string | null
          name?: string | null
          stripeConnectedLinked?: boolean
          updatedAt?: string
          userId?: string
        }
        Relationships: []
      }
      product: {
        Row: {
          category: string
          categoryId: string | null
          colorId: string | null
          createdAt: string
          description: string
          embedding: string | null
          id: string
          imagePath: string
          isAvailableForPurchase: boolean
          name: string
          priceInCents: number
          quantity: number
          sizeId: string | null
          storeId: string
          tokens: number | null
          updatedAt: string
        }
        Insert: {
          category?: string
          categoryId?: string | null
          colorId?: string | null
          createdAt?: string
          description?: string
          embedding?: string | null
          id: string
          imagePath: string
          isAvailableForPurchase?: boolean
          name: string
          priceInCents: number
          quantity?: number
          sizeId?: string | null
          storeId: string
          tokens?: number | null
          updatedAt: string
        }
        Update: {
          category?: string
          categoryId?: string | null
          colorId?: string | null
          createdAt?: string
          description?: string
          embedding?: string | null
          id?: string
          imagePath?: string
          isAvailableForPurchase?: boolean
          name?: string
          priceInCents?: number
          quantity?: number
          sizeId?: string | null
          storeId?: string
          tokens?: number | null
          updatedAt?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_categoryId_fkey"
            columns: ["categoryId"]
            isOneToOne: false
            referencedRelation: "category"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_colorId_fkey"
            columns: ["colorId"]
            isOneToOne: false
            referencedRelation: "color"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_sizeId_fkey"
            columns: ["sizeId"]
            isOneToOne: false
            referencedRelation: "size"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_storeId_fkey"
            columns: ["storeId"]
            isOneToOne: false
            referencedRelation: "store"
            referencedColumns: ["id"]
          },
        ]
      }
      size: {
        Row: {
          createdAt: string
          id: string
          name: string
          storeId: string
          updatedAt: string
          value: string
        }
        Insert: {
          createdAt?: string
          id: string
          name: string
          storeId: string
          updatedAt: string
          value: string
        }
        Update: {
          createdAt?: string
          id?: string
          name?: string
          storeId?: string
          updatedAt?: string
          value?: string
        }
        Relationships: [
          {
            foreignKeyName: "size_storeId_fkey"
            columns: ["storeId"]
            isOneToOne: false
            referencedRelation: "store"
            referencedColumns: ["id"]
          },
        ]
      }
      store: {
        Row: {
          category: string | null
          createdAt: string
          icon: string | null
          id: string
          name: string
          ownerId: string
          pin: number
          subdomain: string
          updatedAt: string
          userId: string
          wake: boolean
        }
        Insert: {
          category?: string | null
          createdAt?: string
          icon?: string | null
          id: string
          name: string
          ownerId: string
          pin?: number
          subdomain: string
          updatedAt: string
          userId: string
          wake?: boolean
        }
        Update: {
          category?: string | null
          createdAt?: string
          icon?: string | null
          id?: string
          name?: string
          ownerId?: string
          pin?: number
          subdomain?: string
          updatedAt?: string
          userId?: string
          wake?: boolean
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
      product_search: {
        Args: {
          query_embedding: string
          similarity_threshold: number
          match_count: number
          store_id: string
        }
        Returns: {
          id: string
          name: string
          description: string
          priceincents: number
          imagepath: string
          similarity: number
        }[]
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
      period: "monthly" | "yearly"
      plans: "STANDARD" | "PRO" | "ULTIMATE"
      pricingInterval: "day" | "week" | "month"
      pricingType: "one_time" | "recurring"
      status:
        | "trialing"
        | "active"
        | "canceled"
        | "incomplete"
        | "incomplete_expired"
        | "past_due"
        | "unpaid"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
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

