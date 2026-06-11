import { ComponentProps } from "react";

type Tone = "teal" | "navy" | "amber" | "gray";

const toneClasses: Record<Tone, string> = {
  teal: "bg-brand-teal/10 text-brand-teal",
  navy: "bg-brand-navy/10 text-brand-navy",
  amber: "bg-brand-amber/15 text-brand-amber",
  gray: "bg-brand-gray/10 text-brand-gray",
};

type BadgeProps = ComponentProps<"span"> & {
  tone?: Tone;
};

export function Badge({ tone = "teal", className = "", ...props }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${toneClasses[tone]} ${className}`}
      {...props}
    />
  );
}
