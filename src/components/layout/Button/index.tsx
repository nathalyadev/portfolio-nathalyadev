import Link from "next/link";
import { HiArrowLongRight } from "react-icons/hi2";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "outline" | "ghost";

export function Button({
  href,
  children,
  className,
  variant = "primary",
  showArrow = false,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  variant?: ButtonVariant;
  showArrow?: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors",
        variant === "primary" &&
          "bg-petrol-blue text-cream hover:bg-[#1f4348]",
        variant === "outline" &&
          "border border-petrol-blue text-petrol-blue hover:bg-petrol-blue/5",
        variant === "ghost" &&
          "border border-beige bg-transparent text-black hover:bg-secondary",
        className,
      )}
    >
      {children}
      {showArrow ? <HiArrowLongRight aria-hidden className="size-4" /> : null}
    </Link>
  );
}
