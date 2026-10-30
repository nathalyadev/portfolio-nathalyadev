import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { isLocalDevRouteAllowed } from "@/lib/local-dev";

export const metadata: Metadata = {
  title: "Cadastro local de projetos",
  robots: { index: false, follow: false },
};

export default function LocalLayout({ children }: React.PropsWithChildren) {
  if (!isLocalDevRouteAllowed()) {
    notFound();
  }

  return (
    <div className="min-h-[calc(100vh-0px)] bg-cream text-black">{children}</div>
  );
}
