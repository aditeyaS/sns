import { FAQCard } from "@/components/FAQCard";
import { Footer } from "@/components/Footer";
import Header from "@/components/Header";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { useState } from "react";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const [showFAQ, setShowFAQ] = useState<boolean>(false);

  return (
    <>
      <ThemeProvider>
        <div className="p-6 flex flex-col gap-6">
          <Header />
          <Outlet />
          {showFAQ && <FAQCard hideFAQ={() => setShowFAQ(false)} />}
          <Footer showFAQ={() => setShowFAQ(true)} />
          <Toaster />
        </div>
      </ThemeProvider>
      <TanStackRouterDevtools />
    </>
  );
}
