import Link from "next/link";
import { cn } from "@/lib/utils";

export const FOOTER_LINKS = [
  { label: "Projetos", href: "/#projetos" },
  { label: "Sobre", href: "/#sobre" },
  { label: "Serviços", href: "/#servicos" },
  { label: "Contato", href: "/#contato" },
] as const;

export function FooterNav({ className }: { className?: string }) {
  return (
    <nav
      className={cn("flex flex-wrap items-center gap-x-6 gap-y-3", className)}
      aria-label="Navegação do rodapé"
    >
      {FOOTER_LINKS.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="text-sm font-medium text-cream/85 transition-colors hover:text-cream"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
