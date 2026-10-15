"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { HiArrowLongRight } from "react-icons/hi2";
import { usePathname } from "next/navigation";
import { navigateInPage } from "@/utils/smoothScroll";

export function CtaLink({
  className,
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) {
  const pathname = usePathname();

  return (
    <Link
      href="/#contato"
      className={cn(
        "inline-flex items-center gap-2 rounded-full bg-petrol-blue px-5 py-2.5 text-sm font-medium text-cream transition-colors hover:bg-[#1f4348]",
        className,
      )}
      onClick={(event) => {
        onClick?.();

        if (pathname === "/") {
          event.preventDefault();
          window.setTimeout(() => navigateInPage("/#contato"), 160);
        }
      }}
    >
      Vamos começar
      <HiArrowLongRight aria-hidden className="size-4" />
    </Link>
  );
}
