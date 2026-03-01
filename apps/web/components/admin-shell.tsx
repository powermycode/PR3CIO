import type { ReactNode } from "react";
import Link from "next/link";

export function AdminShell({ title, children }: { title: string; children: ReactNode }) {
  return (
    <main className="page-container" style={{ padding: 24, display: "grid", gap: 20 }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ margin: 0 }}>{title}</h1>
        <Link href="/" style={{ color: "#a9a9a9" }}>
          Back to site
        </Link>
      </header>
      {children}
    </main>
  );
}
