import React from "react";
import clsx from "clsx";

type ColorType =
  | "primary"
  | "secondary"
  | "accent"
  | "info"
  | "success"
  | "warning"
  | "error"
  | "neutral";

type VariantType = "fill" | "outline" | "ghost";

interface DsButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: ColorType;
  variant?: VariantType;
  size?: "sm" | "md" | "lg";
}

export default function DsButton({
  children,
  color = "primary",
  variant = "fill",
  size = "md",
  className,
  ...props
}: DsButtonProps) {
  return (
    <button
      {...props}
      className={clsx(
        "ds-btn", // ✅ Base DaisyUI button
        `ds-btn-${color}`, // ✅ Color (primary, secondary, etc.)
        variant === "outline" && "ds-btn-outline",
        variant === "ghost" && "ds-btn-ghost",
        size === "sm" && "ds-btn-sm",
        size === "lg" && "ds-btn-lg",
        className
      )}
    >
      {children}
    </button>
  );
}
