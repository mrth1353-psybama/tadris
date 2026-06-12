"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { mainNav, siteConfig } from "@/lib/site-config";

type HeaderProps = {
  isAuthenticated?: boolean;
};

export function Header({ isAuthenticated = false }: HeaderProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-brand-charcoal/10 bg-brand-cream/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="text-lg font-bold text-brand-charcoal">
          {siteConfig.name}
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {mainNav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-brand-teal ${
                  active ? "text-brand-teal" : "text-brand-charcoal/80"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <LinkButton
            href={isAuthenticated ? "/dashboard" : "/login"}
            variant="outline"
            className="px-4 py-2"
          >
            {isAuthenticated ? "داشبورد" : "ورود"}
          </LinkButton>
          <LinkButton href="/contact" className="px-4 py-2">
            مشاوره رایگان
          </LinkButton>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-brand-charcoal md:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="باز و بسته کردن منو"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </Container>

      {open && (
        <div className="border-t border-brand-charcoal/10 bg-brand-cream md:hidden">
          <Container className="flex flex-col gap-4 py-4">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-brand-charcoal/80 hover:text-brand-teal"
              >
                {item.label}
              </Link>
            ))}
            <div className="flex flex-col gap-3 pt-2">
              <LinkButton
                href={isAuthenticated ? "/dashboard" : "/login"}
                variant="outline"
                onClick={() => setOpen(false)}
              >
                {isAuthenticated ? "داشبورد" : "ورود"}
              </LinkButton>
              <LinkButton href="/contact" onClick={() => setOpen(false)}>
                مشاوره رایگان
              </LinkButton>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
