export type UserRole = "user" | "admin";

export type OrderStatus =
  | "pending"
  | "awaiting_payment"
  | "in_progress"
  | "completed"
  | "cancelled";

export type ServiceCategory = "statistical_analysis" | "ai_consulting";

export type OrderFileKind = "input" | "deliverable";

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          phone: string | null;
          role: UserRole;
          created_at: string;
        };
        Insert: {
          id: string;
          full_name?: string | null;
          phone?: string | null;
          role?: UserRole;
          created_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string | null;
          phone?: string | null;
          role?: UserRole;
          created_at?: string;
        };
        Relationships: [];
      };
      services: {
        Row: {
          id: string;
          slug: string;
          title: string;
          category: ServiceCategory;
          description: string | null;
          price_from: number | null;
          price_to: number | null;
          features: string[] | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          category: ServiceCategory;
          description?: string | null;
          price_from?: number | null;
          price_to?: number | null;
          features?: string[] | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          title?: string;
          category?: ServiceCategory;
          description?: string | null;
          price_from?: number | null;
          price_to?: number | null;
          features?: string[] | null;
          created_at?: string;
        };
        Relationships: [];
      };
      orders: {
        Row: {
          id: string;
          user_id: string;
          service_id: string | null;
          status: OrderStatus;
          notes: string | null;
          price: number | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          service_id?: string | null;
          status?: OrderStatus;
          notes?: string | null;
          price?: number | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          service_id?: string | null;
          status?: OrderStatus;
          notes?: string | null;
          price?: number | null;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "orders_service_id_fkey";
            columns: ["service_id"];
            isOneToOne: false;
            referencedRelation: "services";
            referencedColumns: ["id"];
          },
        ];
      };
      order_files: {
        Row: {
          id: string;
          order_id: string;
          uploaded_by: string;
          file_path: string;
          file_name: string;
          kind: OrderFileKind;
          created_at: string;
        };
        Insert: {
          id?: string;
          order_id: string;
          uploaded_by: string;
          file_path: string;
          file_name: string;
          kind: OrderFileKind;
          created_at?: string;
        };
        Update: {
          id?: string;
          order_id?: string;
          uploaded_by?: string;
          file_path?: string;
          file_name?: string;
          kind?: OrderFileKind;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "order_files_order_id_fkey";
            columns: ["order_id"];
            isOneToOne: false;
            referencedRelation: "orders";
            referencedColumns: ["id"];
          },
        ];
      };
      testimonials: {
        Row: {
          id: string;
          name: string;
          role_label: string | null;
          content: string;
          is_featured: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          role_label?: string | null;
          content: string;
          is_featured?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          role_label?: string | null;
          content?: string;
          is_featured?: boolean;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: {
      is_admin: {
        Args: Record<string, never>;
        Returns: boolean;
      };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
