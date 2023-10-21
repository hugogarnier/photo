import { Toaster } from "@/components/ui/toaster";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className={`mx-6 lg:mx-36`}>
      <Toaster />
      {children}
    </section>
  );
}
