"use server";

import { revalidatePath } from "next/cache";

import { deleteLocation, updateLocation } from "@/services/location.service";
import type { Country } from "@/types/location";

export async function deleteLocationAction(formData: FormData) {
  const id = String(formData.get("id"));

  await deleteLocation(id);
  revalidatePath("/locations");
}

export async function updateLocationAction(formData: FormData) {
  const id = String(formData.get("id"));
  const description = String(formData.get("description") ?? "").trim();

  await updateLocation(id, {
    name: String(formData.get("name")).trim(),
    city: String(formData.get("city")).trim(),
    country: formData.get("country") as Country,
    description: description || undefined,
  });

  revalidatePath("/locations");
}
