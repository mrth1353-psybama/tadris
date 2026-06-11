import Link from "next/link";
import { ComponentProps } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-brand-teal text-white hover:bg-brand-teal/90 focus-visible:outline-brand-teal",
  secondary:
    "bg-brand-navy text-white hover:bg-brand-navy/90 focus-visible:outline-brand-navy",
  outline:
    "border border-brand-charcoal/20 text-brand-charcoal hover:bg-brand-charcoal/5 focus-visible:outline-brand-charcoal",
  ghost:
    "text-brand-teal hover:bg-brand-teal/10 focus-visible:outline-brand-teal",
};

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none";

type ButtonProps = ComponentProps<"button"> & {
  variant?: Variant;
};

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    />
  );
}

type LinkButtonProps = ComponentProps<typeof Link> & {
  variant?: Variant;
};

export function LinkButton({
  variant = "primary",
  className = "",
  ...props
}: LinkButtonProps) {
  return (
    <Link
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    />
  );
}
