import { cn } from "@/lib/utils";

export function Container({
  children,
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "footer" | "nav";
}) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full max-w-7xl px-5 sm:px-8 nav:px-12",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
