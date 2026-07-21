"use client";

import { useEffect, useState } from "react";
import type { ChangeEvent } from "react";

import styles from "./PhotoUploadField.module.css";

export const PhotoUploadField = () => {
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    setPreview((current) => {
      if (current) {
        URL.revokeObjectURL(current);
      }

      return file ? URL.createObjectURL(file) : null;
    });
  };

  return (
    <div className={styles.wrapper}>
      {preview ? (
        // eslint-disable-next-line @next/next/no-img-element -- local blob preview, next/image can't optimize object URLs
        <img src={preview} alt="" className={styles.preview} />
      ) : (
        <span className={styles.placeholder} aria-hidden="true">
          ?
        </span>
      )}

      <input name="photo" type="file" accept="image/*" onChange={handleChange} />
    </div>
  );
};
