import type { Metadata } from "next";

import { listManagers } from "@/services/funcionario.service";
import { listLocations } from "@/services/location.service";

import { FuncionarioForm } from "./_components/FuncionarioForm";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "New funcionario",
  description: "Register a new employee.",
};

export default async function NewFuncionarioPage() {
  const [locations, managers] = await Promise.all([
    listLocations(),
    listManagers(),
  ]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>New funcionario</h1>
      <FuncionarioForm locations={locations} managers={managers} />
    </div>
  );
}
