import { FieldValue } from "firebase-admin/firestore";

import { db } from "@/lib/firebase";
import type { Location, LocationInput, LocationUpdateInput } from "@/types/location";

const LOCATIONS_COLLECTION = "locations";

export async function listLocations(): Promise<Location[]> {
  const snapshot = await db.collection(LOCATIONS_COLLECTION).get();

  return snapshot.docs
    .map((doc) => ({ id: doc.id, ...doc.data() }) as Location)
    .sort((a, b) => a.name.localeCompare(b.name));
}

export async function createLocation(
  input: LocationInput,
): Promise<Location | null> {
  const docRef = db.collection(LOCATIONS_COLLECTION).doc(input.id);
  const existing = await docRef.get();

  if (existing.exists) {
    return null;
  }

  const record: Omit<Location, "id"> = {
    name: input.name,
    city: input.city,
    country: input.country,
    ...(input.description ? { description: input.description } : {}),
    createdAt: new Date().toISOString(),
  };

  await docRef.set(record);

  return { id: input.id, ...record };
}

export async function deleteLocation(id: string): Promise<void> {
  await db.collection(LOCATIONS_COLLECTION).doc(id).delete();
}

export async function updateLocation(
  id: string,
  input: LocationUpdateInput,
): Promise<void> {
  await db
    .collection(LOCATIONS_COLLECTION)
    .doc(id)
    .update({
      name: input.name,
      city: input.city,
      country: input.country,
      description: input.description ? input.description : FieldValue.delete(),
    });
}
