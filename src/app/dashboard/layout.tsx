import { redirect } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { DashboardNav } from "@/components/dashboard/DashboardNav";
import { SignOutButton } from "@/components/dashboard/SignOutButton";
import { createClient, getCurrentUser } from "@/lib/supabase/server";

export default async function DashboardLayout({
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

  return (
    <section className="py-10 sm:py-14">
      <Container className="grid gap-6 lg:grid-cols-[260px_1fr]">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <Card className="space-y-4">
            <div>
              <p className="text-sm font-bold text-brand-charcoal">
                {profile?.full_name || user.email}
              </p>
              <p className="mt-1 truncate text-xs text-brand-charcoal/60" dir="ltr">
                {user.email}
              </p>
            </div>

            <DashboardNav isAdmin={profile?.role === "admin"} />

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
