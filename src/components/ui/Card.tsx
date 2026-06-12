import { ComponentProps } from "react";

export function Card({ className = "", ...props }: ComponentProps<"div">) {
  return (
    <div
      className={`rounded-2xl border border-brand-charcoal/10 bg-brand-cream p-6 shadow-sm ${className}`}
      {...props}
    />
  );
}
