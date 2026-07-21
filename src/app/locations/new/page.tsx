import type { Metadata } from "next";

import { LocationForm } from "./_components/LocationForm";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "New location",
  description: "Register a new gym location.",
};

export default function NewLocationPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>New location</h1>
      <LocationForm />
    </div>
  );
}
