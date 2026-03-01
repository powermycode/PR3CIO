'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <div style={{
      display:'flex',
      alignItems:'center',
      justifyContent:'center',
      height:'100vh',
      background:'#0b0b0f',
      color:'white',
      flexDirection:'column'
    }}>
      <h1>Something went wrong</h1>
      <p>{error.message}</p>
      <button
        onClick={() => reset()}
        style={{
          marginTop:20,
          padding:'10px 20px',
          background:'#7c3aed',
          border:'none',
          borderRadius:8,
          color:'white',
          cursor:'pointer'
        }}
      >
        Reload
      </button>
    </div>
  )
}
