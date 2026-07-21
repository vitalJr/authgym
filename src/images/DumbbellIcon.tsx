import type { SVGProps } from "react";

export function DumbbellIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect x="1" y="9" width="3" height="6" rx="1" />
      <rect x="4.5" y="7" width="2.5" height="10" rx="1" />
      <line x1="7.5" y1="12" x2="16.5" y2="12" />
      <rect x="17" y="7" width="2.5" height="10" rx="1" />
      <rect x="20" y="9" width="3" height="6" rx="1" />
    </svg>
  );
}
