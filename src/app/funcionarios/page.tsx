import type { Metadata } from "next";

import { Button } from "@/components/Button/Button";
import { listFuncionarios } from "@/services/funcionario.service";
import { listLocations } from "@/services/location.service";

import { FuncionariosTable } from "./_components/FuncionariosTable";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Funcionários",
  description: "Manage your gym's employees.",
};

export default async function FuncionariosPage() {
  const [funcionarios, locations] = await Promise.all([
    listFuncionarios(),
    listLocations(),
  ]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Funcionários</h1>
        <Button href="/funcionarios/new" variant="primary">
          New funcionario
        </Button>
      </div>

      <FuncionariosTable funcionarios={funcionarios} locations={locations} />
    </div>
  );
}
