import styles from "./layout.module.css";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className={styles.container}>
      <div className={styles.background} aria-hidden="true">
        <span className={`${styles.orb} ${styles.orbOne}`} />
        <span className={`${styles.orb} ${styles.orbTwo}`} />
        <span className={`${styles.orb} ${styles.orbThree}`} />
      </div>

      <section className={styles.card}>{children}</section>
    </main>
  );
}
