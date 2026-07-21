import type { Metadata } from "next";

import { AdminFuncionariosList } from "./_components/AdminFuncionariosList";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Administrativo",
  description: "Manage which employees have admin access.",
};

export default function AdminPage() {
  return (
    <div className={styles.container}>
      <AdminFuncionariosList />
    </div>
  );
}
