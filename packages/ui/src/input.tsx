import type { InputHTMLAttributes } from "react";

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      style={{
        width: "100%",
        borderRadius: 10,
        border: "1px solid #313131",
        background: "#0d0d0d",
        color: "#f5f5f5",
        padding: "10px 12px",
        ...(props.style ?? {})
      }}
    />
  );
}
