import { Container } from "@/components/ui/Container";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="flex flex-1 items-center py-16 sm:py-24">
      <Container className="flex justify-center">
        <div className="w-full max-w-md">{children}</div>
      </Container>
    </section>
  );
}
