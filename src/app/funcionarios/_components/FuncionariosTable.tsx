"use client";

import { useState } from "react";

import { Avatar } from "@/components/Avatar/Avatar";
import { Button } from "@/components/Button/Button";
import { Modal } from "@/components/Modal/Modal";
import type { Funcionario } from "@/types/funcionario";
import type { Location } from "@/types/location";

import { deactivateFuncionarioAction } from "../_actions";
import { FuncionarioDetailPanel } from "./FuncionarioDetailPanel";
import styles from "./FuncionariosTable.module.css";

interface FuncionariosTableProps {
  funcionarios: Funcionario[];
  locations: Location[];
}

export const FuncionariosTable = ({
  funcionarios,
  locations,
}: FuncionariosTableProps) => {
  const [selected, setSelected] = useState<Funcionario | null>(null);
  const [toDelete, setToDelete] = useState<Funcionario | null>(null);

  if (funcionarios.length === 0) {
    return <p className={styles.empty}>No funcionarios registered yet.</p>;
  }

  return (
    <>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th aria-label="Photo" />
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Location</th>
              <th>Account</th>
              <th aria-label="Actions" />
            </tr>
          </thead>
          <tbody>
            {funcionarios.map((funcionario) => (
              <tr
                key={funcionario.id}
                className={styles.row}
                onClick={() => setSelected(funcionario)}
              >
                <td>
                  <Avatar
                    name={funcionario.name}
                    src={funcionario.photoUrl}
                    size={32}
                  />
                </td>
                <td>{funcionario.name}</td>
                <td>{funcionario.email}</td>
                <td>{funcionario.role}</td>
                <td>{funcionario.location}</td>
                <td>
                  <span
                    className={
                      funcionario.accountEnabled
                        ? styles.statusActive
                        : styles.statusPending
                    }
                  >
                    {funcionario.accountEnabled ? "Active" : "Pending"}
                  </span>
                </td>
                <td>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={(event) => {
                      event.stopPropagation();
                      setToDelete(funcionario);
                    }}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selected && (
        <FuncionarioDetailPanel
          key={selected.id}
          funcionario={selected}
          locations={locations}
          onClose={() => setSelected(null)}
        />
      )}

      <Modal
        open={toDelete !== null}
        onClose={() => setToDelete(null)}
        title="Remove funcionario"
      >
        <p className={styles.confirmText}>
          Are you sure you want to remove <strong>{toDelete?.name}</strong>? Their
          data will be kept, but they will no longer appear in the roster and
          won&apos;t be able to sign in.
        </p>

        <div className={styles.confirmActions}>
          <Button type="button" variant="outline" onClick={() => setToDelete(null)}>
            Cancel
          </Button>
          <form action={deactivateFuncionarioAction} onSubmit={() => setToDelete(null)}>
            <input type="hidden" name="id" value={toDelete?.id ?? ""} />
            <Button type="submit" variant="danger">
              Remove
            </Button>
          </form>
        </div>
      </Modal>
    </>
  );
};
