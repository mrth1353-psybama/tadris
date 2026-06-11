import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { mainNav, siteConfig, socialLinks } from "@/lib/site-config";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-brand-charcoal/10 bg-white">
      <Container className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <p className="text-lg font-bold text-brand-charcoal">
            {siteConfig.name}
          </p>
          <p className="mt-3 max-w-xs text-sm leading-6 text-brand-charcoal/70">
            {siteConfig.description}
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold text-brand-charcoal">
            دسترسی سریع
          </p>
          <ul className="mt-4 space-y-2">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-brand-charcoal/70 transition-colors hover:text-brand-teal"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-brand-charcoal">
            شبکه‌های اجتماعی
          </p>
          <ul className="mt-4 space-y-2">
            {socialLinks.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="text-sm text-brand-charcoal/70 transition-colors hover:text-brand-teal"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <div className="border-t border-brand-charcoal/10 py-6">
        <Container>
          <p className="text-center text-xs text-brand-charcoal/60">
            © {year} {siteConfig.name}. تمامی حقوق محفوظ است.
          </p>
        </Container>
      </div>
    </footer>
  );
}
