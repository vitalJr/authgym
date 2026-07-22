"use server";

import { revalidatePath } from "next/cache";

import { auth } from "auth";

import {
  setFuncionarioAccountEnabled,
  setFuncionarioActive,
  updateFuncionario,
} from "@/services/funcionario.service";
import { Role } from "@/types/funcionario";
import type { FuncionarioUpdateInput } from "@/types/funcionario";

export async function updateFuncionarioAction(formData: FormData) {
  const id = String(formData.get("id"));
  const tipoSanguineo = formData.get("tipoSanguineo");
  const manager = formData.get("manager");

  const input: FuncionarioUpdateInput = {
    name: String(formData.get("name")),
    telefone: String(formData.get("telefone")),
    age: Number(formData.get("age")),
    salary: Number(formData.get("salary")),
    salaryMonths: Number(formData.get("salaryMonths")) as 12 | 13 | 14,
    vocationsDay: Number(formData.get("vocationsDay")),
    role: formData.get("role") as Role,
    tipoSanguineo: tipoSanguineo ? String(tipoSanguineo) : undefined,
    location: String(formData.get("location")),
    manager: manager ? String(manager) : undefined,
  };

  await updateFuncionario(id, input);
  revalidatePath("/funcionarios");
}

export async function deactivateFuncionarioAction(formData: FormData) {
  const id = String(formData.get("id"));

  await setFuncionarioActive(id, false);
  revalidatePath("/funcionarios");
}

export async function activateFuncionarioAccountAction(formData: FormData) {
  const session = await auth();

  if (session?.user?.role !== Role.GERENTE) {
    throw new Error("Only managers can activate funcionario accounts.");
  }

  const id = String(formData.get("id"));

  await setFuncionarioAccountEnabled(id, true);
  revalidatePath("/funcionarios");
}
