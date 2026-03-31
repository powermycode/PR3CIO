import { testAction } from "./actions";

export default async function HomePage() {
  const result = await testAction();

  return (
    <main className="page-shell">
      <section className="card">
        <p className="eyebrow">PR3CIO</p>
        <h1>App Router is configured.</h1>
        <p className="copy">
          The root Next.js app now has a valid <code>app/page.tsx</code>,
          <code> app/layout.tsx</code>, and route-local styling.
        </p>
        <div className="status-row">
          <span className="status-dot" aria-hidden="true" />
          <span>{result.success ? "No import errors detected." : "Action failed."}</span>
        </div>
      </section>
    </main>
  );
}
