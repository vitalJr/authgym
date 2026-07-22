import type { Metadata } from "next";

import { Button } from "@/components/Button/Button";
import { listLocations } from "@/services/location.service";

import { LocationsList } from "./_components/LocationsList";
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

      <LocationsList locations={locations} />
    </div>
  );
}
