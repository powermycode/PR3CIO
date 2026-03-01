import Link from "next/link";

export function BrandLogo({ subtitle }: { subtitle?: string }) {
  return (
    <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
      <img src="/pr3cio-logo.png" alt="PR3CIO logo" width={38} height={38} />
      <span style={{ display: "grid", lineHeight: 1.1, minWidth: 0 }}>
        <strong style={{ fontSize: 15, letterSpacing: 0.2 }}>PR3CIO</strong>
        {subtitle ? (
          <small className="brand-subtitle-marquee" aria-label={subtitle}>
            <span className="brand-subtitle-track">
              <span>{subtitle}</span>
              <span aria-hidden>{subtitle}</span>
            </span>
          </small>
        ) : null}
      </span>
    </Link>
  );
}
