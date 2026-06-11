"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, PlusCircle, ShieldCheck } from "lucide-react";

type DashboardNavProps = {
  isAdmin?: boolean;
};

const links = [
  { href: "/dashboard", label: "سفارش‌های من", icon: LayoutDashboard, exact: true },
  { href: "/dashboard/orders/new", label: "ثبت سفارش جدید", icon: PlusCircle, exact: false },
];

export function DashboardNav({ isAdmin = false }: DashboardNavProps) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1">
      {links.map(({ href, label, icon: Icon, exact }) => {
        const active = exact ? pathname === href : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-colors ${
              active
                ? "bg-brand-teal/10 text-brand-teal"
                : "text-brand-charcoal/70 hover:bg-brand-charcoal/5 hover:text-brand-charcoal"
            }`}
          >
            <Icon size={18} />
            {label}
          </Link>
        );
      })}

      {isAdmin && (
        <Link
          href="/admin"
          className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-colors ${
            pathname.startsWith("/admin")
              ? "bg-brand-navy/10 text-brand-navy"
              : "text-brand-charcoal/70 hover:bg-brand-charcoal/5 hover:text-brand-charcoal"
          }`}
        >
          <ShieldCheck size={18} />
          پنل ادمین
        </Link>
      )}
    </nav>
  );
}
