"use server";

import { revalidatePath } from "next/cache";

import { setFuncionarioAdmin } from "@/services/funcionario.service";

export async function addAdminAction(formData: FormData) {
  const id = String(formData.get("id"));

  await setFuncionarioAdmin(id, true);
  revalidatePath("/admin");
}

export async function removeAdminAction(formData: FormData) {
  const id = String(formData.get("id"));

  await setFuncionarioAdmin(id, false);
  revalidatePath("/admin");
}
