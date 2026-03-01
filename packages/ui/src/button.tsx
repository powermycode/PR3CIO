import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

type ButtonVariant = "primary" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export function Button({ children, variant = "primary", ...props }: PropsWithChildren<ButtonProps>) {
  const background = variant === "primary" ? "#6f2bff" : "transparent";
  const border = variant === "primary" ? "1px solid #6f2bff" : "1px solid #3a3a3a";
  const color = variant === "primary" ? "#ffffff" : "#d9d9d9";

  return (
    <button
      {...props}
      style={{
        background,
        border,
        color,
        borderRadius: 12,
        padding: "10px 14px",
        fontWeight: 600,
        cursor: "pointer"
      }}
    >
      {children}
    </button>
  );
}
