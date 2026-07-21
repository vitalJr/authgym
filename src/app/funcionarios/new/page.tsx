import type { Metadata } from "next";

import { listLocations } from "@/services/location.service";

import { FuncionarioForm } from "./_components/FuncionarioForm";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "New funcionario",
  description: "Register a new employee.",
};

export default async function NewFuncionarioPage() {
  const locations = await listLocations();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>New funcionario</h1>
      <FuncionarioForm locations={locations} />
    </div>
  );
}
