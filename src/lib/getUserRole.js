import { supabase } from "./supabase";

export async function getUserRole(clerkId) {
  const { data, error } = await supabase
    .from("users")
    .select("role")
    .eq("clerk_id", clerkId)
    .single();

  if (error || !data) return null;

  return data.role;
}