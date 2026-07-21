import Image from "next/image";

import styles from "./Avatar.module.css";

interface AvatarProps {
  name: string;
  src?: string;
  size?: number;
}

export const Avatar = ({ name, src, size = 32 }: AvatarProps) => {
  if (src) {
    return (
      <Image
        src={src}
        alt={name}
        width={size}
        height={size}
        className={styles.image}
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <span
      className={styles.fallback}
      style={{ width: size, height: size, fontSize: size * 0.4 }}
      aria-hidden="true"
    >
      {name.charAt(0).toUpperCase()}
    </span>
  );
};
