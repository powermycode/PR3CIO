import type { CSSProperties } from "react";
import { TopBar } from "../../components/top-bar";
import {
  pr3cioFooterLinks,
  pr3cioSubtitle,
  pr3cioTagline,
  whatYouCanDo,
  whyArtistsChoose
} from "../../lib/pr3cio-content";

const panelLinks = [
  {
    href: "/listener",
    title: "Listener Panel",
    description: "Stream OG tracks, like songs, comment in real time, and manage your listener profile."
  },
  {
    href: "/artist",
    title: "Artist Panel",
    description: "Generate songs with AI, manage drafts, publish OG tracks, and update your artist profile."
  },
  {
    href: "/admin",
    title: "Admin Panel",
    description: "Moderate tracks and reports, enforce compliance, and manage platform-wide controls."
  }
] as const;

export default function UsersEntryPage() {
  return (
    <main style={page}>
      <TopBar subtitle={pr3cioSubtitle} />

      <section style={sectionWrap}>
        <h1 style={sectionTitle}>
          What You Can Do on <span style={{ color: "#354EB4" }}>PR3CIO</span>
        </h1>
        <div style={cardsGrid}>
          {whatYouCanDo.map((item) => (
            <article key={item.title} style={card}>
              <h2 style={cardTitle}>{item.title}</h2>
              <p style={cardBody}>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section style={sectionWrap}>
        <h2 style={sectionTitle}>
          Why <span style={{ color: "#354EB4" }}>Artists Choose PR3CIO</span>
        </h2>
        <div style={whyGrid}>
          {whyArtistsChoose.map((item) => (
            <article key={item.title} style={whyCard}>
              <h3 style={cardTitle}>{item.title}</h3>
              <p style={cardBody}>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section style={sectionWrap}>
        <h2 style={sectionTitle}>Platform Panels</h2>
        <div style={cardsGrid}>
          {panelLinks.map((item) => (
            <a key={item.title} href={item.href} style={panelLink}>
              <h3 style={{ ...cardTitle, fontSize: 22 }}>{item.title}</h3>
              <p style={cardBody}>{item.description}</p>
            </a>
          ))}
        </div>
      </section>

      <footer style={footer}>
        <p style={{ margin: 0, textAlign: "center", fontWeight: 500 }}>{pr3cioTagline}</p>
        <div style={footerLinksWrap}>
          {pr3cioFooterLinks.map((item) => (
            <a key={item.label} href={item.href} style={footerLink}>
              {item.label}
            </a>
          ))}
        </div>
      </footer>
    </main>
  );
}

const page: CSSProperties = {
  minHeight: "100vh",
  padding: 16,
  display: "grid",
  gap: 18
};

const sectionWrap: CSSProperties = {
  border: "1px solid var(--line)",
  borderRadius: 22,
  padding: 20,
  background: "rgba(12,12,16,0.9)",
  display: "grid",
  gap: 16
};

const sectionTitle: CSSProperties = {
  margin: 0,
  textAlign: "center",
  fontSize: "clamp(22px, 4.2vw, 44px)",
  letterSpacing: "0.02em"
};

const cardsGrid: CSSProperties = {
  display: "grid",
  gap: 12,
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))"
};

const whyGrid: CSSProperties = {
  display: "grid",
  gap: 12,
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))"
};

const card: CSSProperties = {
  border: "1px solid var(--line)",
  borderRadius: 16,
  padding: 16,
  background: "rgba(20,20,24,0.9)",
  minHeight: 180
};

const whyCard: CSSProperties = {
  border: "1px solid #4b4b63",
  borderRadius: 16,
  padding: 16,
  background: "rgba(24,24,31,0.95)",
  minHeight: 150
};

const panelLink: CSSProperties = {
  ...card,
  textDecoration: "none"
};

const cardTitle: CSSProperties = {
  margin: 0,
  fontSize: 24,
  lineHeight: 1.2
};

const cardBody: CSSProperties = {
  margin: "10px 0 0",
  color: "#c1c1ca",
  fontSize: 15,
  lineHeight: 1.6
};

const footer: CSSProperties = {
  border: "1px solid var(--line)",
  borderRadius: 16,
  padding: 16,
  background: "rgba(10,10,14,0.85)",
  display: "grid",
  gap: 10
};

const footerLinksWrap: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  gap: 12
};

const footerLink: CSSProperties = {
  borderBottom: "1px solid transparent",
  color: "#f0f0f5",
  fontSize: 14,
  textDecoration: "none"
};
