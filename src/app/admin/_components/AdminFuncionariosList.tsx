"use client";

import { useState } from "react";

import { Button } from "@/components/Button/Button";
import { Modal } from "@/components/Modal/Modal";
import type { Funcionario } from "@/types/funcionario";

import { addAdminAction, removeAdminAction } from "../_actions";
import styles from "./AdminFuncionariosList.module.css";

interface AdminFuncionariosListProps {
  funcionarios: Funcionario[];
}

export const AdminFuncionariosList = ({
  funcionarios,
}: AdminFuncionariosListProps) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const admins = funcionarios.filter((funcionario) => funcionario.isAdmin);
  const candidates = funcionarios.filter((funcionario) => !funcionario.isAdmin);

  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.title}>Administrativo</h1>
        <Button type="button" variant="primary" onClick={() => setModalOpen(true)}>
          Add admin
        </Button>
      </div>

      {admins.length === 0 ? (
        <p className={styles.empty}>No employees have admin access yet.</p>
      ) : (
        <ul className={styles.list}>
          {admins.map((funcionario) => (
            <li key={funcionario.id} className={styles.row}>
              <div className={styles.info}>
                <span className={styles.name}>{funcionario.name}</span>
                <span className={styles.email}>{funcionario.email}</span>
              </div>

              <form action={removeAdminAction}>
                <input type="hidden" name="id" value={funcionario.id} />
                <Button type="submit" variant="outline">
                  Remove
                </Button>
              </form>
            </li>
          ))}
        </ul>
      )}

      <Modal
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
        title="Add admin"
      >
        {candidates.length === 0 ? (
          <p className={styles.empty}>No employees available to add.</p>
        ) : (
          <ul className={styles.list}>
            {candidates.map((funcionario) => (
              <li key={funcionario.id} className={styles.row}>
                <div className={styles.info}>
                  <span className={styles.name}>{funcionario.name}</span>
                  <span className={styles.email}>{funcionario.email}</span>
                </div>

                <form action={addAdminAction} onSubmit={() => setModalOpen(false)}>
                  <input type="hidden" name="id" value={funcionario.id} />
                  <Button type="submit" variant="primary">
                    Add
                  </Button>
                </form>
              </li>
            ))}
          </ul>
        )}
      </Modal>
    </div>
  );
};
