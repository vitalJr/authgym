"use server";

import { redirect } from "next/navigation";

import { createLocation } from "@/services/location.service";
import type { Country } from "@/types/location";

export type CreateLocationState = {
  fieldErrors?: {
    id?: string;
  };
  values?: {
    id: string;
    name: string;
    description: string;
    city: string;
    country: string;
  };
};

export async function createLocationAction(
  _prevState: CreateLocationState,
  formData: FormData,
): Promise<CreateLocationState> {
  const id = String(formData.get("id")).trim();
  const name = String(formData.get("name")).trim();
  const description = String(formData.get("description") ?? "").trim();
  const city = String(formData.get("city")).trim();
  const country = formData.get("country") as Country;

  const values = { id, name, description, city, country };

  const location = await createLocation({
    id,
    name,
    description: description || undefined,
    city,
    country,
  });

  if (!location) {
    return {
      fieldErrors: { id: "This ID is already in use." },
      values,
    };
  }

  redirect("/locations");
}
