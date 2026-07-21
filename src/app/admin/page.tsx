import type { Metadata } from "next";

import { listFuncionarios } from "@/services/funcionario.service";

import { AdminFuncionariosList } from "./_components/AdminFuncionariosList";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Administrativo",
  description: "Manage which employees have admin access.",
};

export default async function AdminPage() {
  const funcionarios = await listFuncionarios();

  return (
    <div className={styles.container}>
      <AdminFuncionariosList funcionarios={funcionarios} />
    </div>
  );
}
