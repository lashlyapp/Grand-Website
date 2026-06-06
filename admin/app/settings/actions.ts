"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { revalidatePublicSites } from "@/lib/revalidate";

// Updates a hotel's site-wide service notice (disclaimer) and refreshes the
// public sites so the banner updates right away. An empty value clears the
// notice, which hides the banner on that hotel's site.
export async function updateHotelDisclaimer(hotelId: string, formData: FormData) {
  const disclaimer = String(formData.get("disclaimer") ?? "").trim();
  const supabase = createSupabaseServerClient();
  const { error } = await supabase
    .from("hotels")
    .update({ disclaimer })
    .eq("id", hotelId);
  if (error) throw new Error(`Update failed: ${error.message}`);
  revalidatePath("/settings");
  await revalidatePublicSites();
}
