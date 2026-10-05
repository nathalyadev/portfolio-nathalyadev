import { isActivePath } from "@/utils/isActivePath";
import { cn } from "cn";
import Link from "next/link";
import { NAV_ITEMS } from "../header";

export function NavLinks({
  pathname,
  className,
  linkClassName,
  onNavigate,
  underline = "bar",
}: {
  pathname: string;
  className?: string;
  linkClassName?: string;
  onNavigate?: () => void;
  underline?: "bar" | "text";
}) {
  return (
    <nav className={className} aria-label="Navegação principal">
      {NAV_ITEMS.map((item) => {
        const isActive = isActivePath(pathname, item.href);

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
            onClick={onNavigate}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
