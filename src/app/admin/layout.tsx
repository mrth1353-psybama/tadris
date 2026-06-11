import { redirect } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { AdminNav } from "@/components/admin/AdminNav";
import { SignOutButton } from "@/components/dashboard/SignOutButton";
import { createClient, getCurrentUser } from "@/lib/supabase/server";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const supabase = await createClient();
  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") {
    redirect("/dashboard");
  }

  return (
    <section className="py-10 sm:py-14">
      <Container className="grid gap-6 lg:grid-cols-[260px_1fr]">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <Card className="space-y-4">
            <div>
              <p className="text-sm font-bold text-brand-charcoal">
                {profile?.full_name || user.email}
              </p>
              <p className="mt-1 text-xs text-brand-navy">پنل مدیریت</p>
            </div>

            <AdminNav />

            <div className="border-t border-brand-charcoal/10 pt-2">
              <SignOutButton />
            </div>
          </Card>
        </aside>

        <div>{children}</div>
      </Container>
    </section>
  );
}
