import { supabase } from "../config/supabase.js";

export const syncUser = async (req, res) => {
  const { clerkId, email } = req.body;

  if (!clerkId) {
    return res.status(400).json({ message: "Missing clerkId" });
  }

  // STEP 1: CHECK EXISTING USER
  const { data: existingUser, error: fetchError } = await supabase
    .from("users")
    .select("*")
    .eq("clerk_id", clerkId)
    .maybeSingle();

  if (fetchError) {
    return res.status(500).json({ message: fetchError.message });
  }

  if (existingUser) {
    return res.json({
      role: existingUser.role,
      user: existingUser,
    });
  }

  // STEP 2: CREATE USER (FORCED SAFE INSERT)
  const { data: newUser, error: insertError } = await supabase
    .from("users")
    .insert([
      {
        clerk_id: clerkId,
        email: email || "",
        role: "customer",
        rider_status: "none",
      },
    ])
    .select()
    .single();

  if (insertError) {
    return res.status(500).json({
      message: "User creation failed",
      error: insertError.message,
    });
  }

  return res.json({
    role: newUser.role,
    user: newUser,
  });
};