import type { Tables } from "@/lib/supabase/database.types";

export type Profile = Tables<"profiles">;
export type Post = Tables<"posts"> & {
  profiles?: Pick<Profile, "username" | "display_name"> | null;
  like_count?: number;
};
export type Purchase = Tables<"purchases">;
