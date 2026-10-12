import { cn } from "@/lib/utils";

interface ContainerProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "footer" | "nav";
}

export function Container({
  id,
  children,
  className,
  as: Tag = "div",
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full max-w-7xl px-5 sm:px-8 nav:px-12",
        className,
      )}
      id={id}
    >
      {children}
    </Tag>
  );
}
