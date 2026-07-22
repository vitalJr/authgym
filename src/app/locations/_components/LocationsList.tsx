"use client";

import { useState } from "react";

import { Button } from "@/components/Button/Button";
import { Modal } from "@/components/Modal/Modal";
import { TrashIcon } from "@/images";
import type { Location } from "@/types/location";

import { deleteLocationAction } from "../_actions";
import { LocationDetailPanel } from "./LocationDetailPanel";
import styles from "./LocationsList.module.css";

interface LocationsListProps {
  locations: Location[];
}

export const LocationsList = ({ locations }: LocationsListProps) => {
  const [selected, setSelected] = useState<Location | null>(null);
  const [toDelete, setToDelete] = useState<Location | null>(null);

  if (locations.length === 0) {
    return <p className={styles.empty}>No locations registered yet.</p>;
  }

  return (
    <>
      <ul className={styles.list}>
        {locations.map((location) => (
          <li
            key={location.id}
            className={styles.row}
            onClick={() => setSelected(location)}
          >
            <div className={styles.info}>
              <span className={styles.name}>{location.name}</span>
              <span className={styles.meta}>
                {location.id} · {location.city}, {location.country}
              </span>
              {location.description && (
                <span className={styles.description}>
                  {location.description}
                </span>
              )}
            </div>

            <button
              type="button"
              className={styles.deleteButton}
              onClick={(event) => {
                event.stopPropagation();
                setToDelete(location);
              }}
              aria-label={`Delete ${location.name}`}
            >
              <TrashIcon aria-hidden="true" />
            </button>
          </li>
        ))}
      </ul>

      {selected && (
        <LocationDetailPanel
          key={selected.id}
          location={selected}
          onClose={() => setSelected(null)}
        />
      )}

      <Modal
        open={toDelete !== null}
        onClose={() => setToDelete(null)}
        title="Remove location"
      >
        <p className={styles.confirmText}>
          Are you sure you want to remove <strong>{toDelete?.name}</strong>?
          This cannot be undone.
        </p>

        <div className={styles.confirmActions}>
          <Button type="button" variant="outline" onClick={() => setToDelete(null)}>
            Cancel
          </Button>
          <form
            action={deleteLocationAction}
            onSubmit={() => setToDelete(null)}
          >
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
