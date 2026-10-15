import { isActivePath } from "@/utils/isActivePath";
import { navigateInPage } from "@/utils/smoothScroll";
import { cn } from "cn";
import Link from "next/link";
import { NAV_ITEMS } from "../header";

function hashFromHref(href: string) {
  const hashIndex = href.indexOf("#");
  return hashIndex === -1 ? "" : href.slice(hashIndex);
}

export function NavLinks({
  pathname,
  hash = "",
  className,
  linkClassName,
  onNavigate,
  onHashChange,
  underline = "bar",
}: {
  pathname: string;
  hash?: string;
  className?: string;
  linkClassName?: string;
  onNavigate?: () => void;
  onHashChange?: (hash: string) => void;
  underline?: "bar" | "text";
}) {
  return (
    <nav className={className} aria-label="Navegação principal">
      {NAV_ITEMS.map((item) => {
        const isActive = isActivePath(pathname, item.href, hash);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "relative text-sm font-medium tracking-wide text-black transition-colors hover:text-petrol-blue",
              underline === "bar" &&
                isActive &&
                "after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-black",
              underline === "text" &&
                isActive &&
                "underline decoration-1 underline-offset-8",
              linkClassName,
            )}
            aria-current={isActive ? "page" : undefined}
            onClick={(event) => {
              const nextHash = hashFromHref(item.href);
              onHashChange?.(nextHash);
              onNavigate?.();

              // Mesma página: scroll suave em vez do salto padrão do Link
              if (pathname === "/") {
                event.preventDefault();

                const run = () => navigateInPage(item.href);
                // Fecha o menu mobile antes de rolar
                window.setTimeout(run, onNavigate ? 160 : 0);
              }
            }}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
