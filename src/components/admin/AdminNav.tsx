"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, ClipboardList, MessageSquareQuote } from "lucide-react";

const links = [
  { href: "/admin/orders", label: "سفارش‌ها", icon: ClipboardList },
  { href: "/admin/testimonials", label: "نظرات مشتریان", icon: MessageSquareQuote },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1">
      {links.map(({ href, label, icon: Icon }) => {
        const active = pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-colors ${
              active
                ? "bg-brand-navy/10 text-brand-navy"
                : "text-brand-charcoal/70 hover:bg-brand-charcoal/5 hover:text-brand-charcoal"
            }`}
          >
            <Icon size={18} />
            {label}
          </Link>
        );
      })}

      <div className="mt-2 border-t border-brand-charcoal/10 pt-2">
        <Link
          href="/dashboard"
          className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-brand-charcoal/70 transition-colors hover:bg-brand-charcoal/5 hover:text-brand-charcoal"
        >
          <ArrowRight size={18} />
          بازگشت به داشبورد
        </Link>
      </div>
    </nav>
  );
}
