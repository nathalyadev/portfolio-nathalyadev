"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { navigateInPage } from "@/utils/smoothScroll";

export function LogoLink({
  className,
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) {
  const pathname = usePathname();

  return (
    <Link
      href="/"
      className={cn(
        "relative shrink-0 transition-opacity hover:opacity-80",
        className,
      )}
      aria-label="Nathálya Souza — página inicial"
      onClick={(event) => {
        onClick?.();

        if (pathname === "/") {
          event.preventDefault();
          window.setTimeout(() => navigateInPage("/"), 0);
        }
      }}
    >
      <Image
        src="/logo.svg"
        alt="Nathálya Souza"
        width={206}
        height={34}
        priority
        className="h-6 w-auto sm:h-7.5"
      />
    </Link>
  );
}
