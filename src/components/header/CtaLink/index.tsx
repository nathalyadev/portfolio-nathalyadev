"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { HiArrowLongRight } from "react-icons/hi2";

export function CtaLink({
  className,
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) {
  return (
    <Link
      href="/#contato"
      className={cn(
        "inline-flex items-center gap-2 rounded-full bg-petrol-blue px-5 py-2.5 text-sm font-medium text-cream transition-colors hover:bg-[#1f4348]",
        className,
      )}
      onClick={onClick}
    >
      Vamos começar
      <HiArrowLongRight aria-hidden className="size-4" />
    </Link>
  );
}
