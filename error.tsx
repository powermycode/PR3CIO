'use client'

export default function Error({ error }: { error: Error }) {
  return (
    <div style={{
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#000",
      color: "#fff"
    }}>
      <h1>Something went wrong</h1>
    </div>
  )
}
