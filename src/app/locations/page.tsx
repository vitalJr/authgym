import type { Metadata } from "next";

import { Button } from "@/components/Button/Button";
import { listLocations } from "@/services/location.service";

import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Locations",
  description: "Manage the gym locations available when registering funcionarios.",
};

export default async function LocationsPage() {
  const locations = await listLocations();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Locations</h1>
        <Button href="/locations/new" variant="primary">
          New location
        </Button>
      </div>

      {locations.length === 0 ? (
        <p className={styles.empty}>No locations registered yet.</p>
      ) : (
        <ul className={styles.list}>
          {locations.map((location) => (
            <li key={location.id} className={styles.row}>
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
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
