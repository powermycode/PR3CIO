import type { PropsWithChildren } from "react";

export function Card({ children }: PropsWithChildren) {
  return (
    <div
      style={{
        border: "1px solid #2f2f2f",
        background: "#111111",
        borderRadius: 16,
        padding: 16
      }}
    >
      {children}
    </div>
  );
}
