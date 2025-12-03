import { Sidebar } from "@/components/dashboard/sidebar";
import { Header } from "@/components/dashboard/header";
import { GridPatternBackground } from "@/components/ui/SectionBackgrounds";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0 relative">
        <GridPatternBackground className="absolute inset-0 z-0 h-full" />
        <Header />
        <div className="flex-1 p-6 overflow-auto relative z-10">{children}</div>
      </main>
    </div>
  );
}
