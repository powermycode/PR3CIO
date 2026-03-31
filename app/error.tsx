'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <main className="page-shell">
      <section className="card">
        <p className="eyebrow">Application Error</p>
        <h1>Something went wrong.</h1>
        <p className="copy">{error.message || "Unexpected error"}</p>
        <button className="button" onClick={() => reset()}>
          Try again
        </button>
      </section>
    </main>
  );
}
