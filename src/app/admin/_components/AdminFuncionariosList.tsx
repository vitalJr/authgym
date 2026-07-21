"use client";

import { useState } from "react";

import { Button } from "@/components/Button/Button";
import { Modal } from "@/components/Modal/Modal";
import type { Funcionario } from "@/types/funcionario";

import { mockFuncionarios } from "../_mock";
import styles from "./AdminFuncionariosList.module.css";

export const AdminFuncionariosList = () => {
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>(mockFuncionarios);
  const [isModalOpen, setModalOpen] = useState(false);

  const admins = funcionarios.filter((funcionario) => funcionario.isAdmin);
  const candidates = funcionarios.filter((funcionario) => !funcionario.isAdmin);

  const setIsAdmin = (id: string, isAdmin: boolean) => {
    setFuncionarios((current) =>
      current.map((funcionario) =>
        funcionario.id === id ? { ...funcionario, isAdmin } : funcionario,
      ),
    );
  };

  const handleAdd = (id: string) => {
    setIsAdmin(id, true);
    setModalOpen(false);
  };

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

              <Button
                type="button"
                variant="outline"
                onClick={() => setIsAdmin(funcionario.id, false)}
              >
                Remove
              </Button>
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

                <Button
                  type="button"
                  variant="primary"
                  onClick={() => handleAdd(funcionario.id)}
                >
                  Add
                </Button>
              </li>
            ))}
          </ul>
        )}
      </Modal>
    </div>
  );
};
