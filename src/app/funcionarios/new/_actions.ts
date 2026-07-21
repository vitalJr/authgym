"use server";

import { redirect } from "next/navigation";

import { createFuncionario } from "@/services/funcionario.service";
import { Role } from "@/types/funcionario";
import type { FuncionarioPhoto } from "@/types/funcionario";

export type CreateFuncionarioState = {
  fieldErrors?: {
    email?: string;
  };
  values?: {
    name: string;
    email: string;
    telefone: string;
    age: string;
    tipoSanguineo: string;
    role: string;
    location: string;
    manager: string;
    vocationsDay: string;
  };
};

export async function createFuncionarioAction(
  _prevState: CreateFuncionarioState,
  formData: FormData,
): Promise<CreateFuncionarioState> {
  const tipoSanguineo = formData.get("tipoSanguineo");
  const manager = formData.get("manager");
  const photoFile = formData.get("photo");

  const values = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    telefone: String(formData.get("telefone") ?? ""),
    age: String(formData.get("age") ?? ""),
    tipoSanguineo: tipoSanguineo ? String(tipoSanguineo) : "",
    role: String(formData.get("role") ?? ""),
    location: String(formData.get("location") ?? ""),
    manager: manager ? String(manager) : "",
    vocationsDay: String(formData.get("vocationsDay") ?? ""),
  };

  let photo: FuncionarioPhoto | undefined;

  if (photoFile instanceof File && photoFile.size > 0) {
    photo = {
      buffer: Buffer.from(await photoFile.arrayBuffer()),
      contentType: photoFile.type || "application/octet-stream",
    };
  }

  const funcionario = await createFuncionario({
    name: values.name,
    email: values.email,
    password: String(formData.get("password")),
    telefone: values.telefone,
    age: Number(values.age),
    salary: Number(formData.get("salary")),
    salaryMonths: Number(formData.get("salaryMonths")) as 12 | 13 | 14,
    vocationsDay: Number(values.vocationsDay),
    role: values.role as Role,
    tipoSanguineo: values.tipoSanguineo || undefined,
    location: values.location,
    manager: values.manager || undefined,
    photo,
  });

  if (!funcionario) {
    return {
      fieldErrors: { email: "This email is already in use." },
      values,
    };
  }

  redirect("/funcionarios");
}
