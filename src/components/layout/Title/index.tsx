import { cn } from "cn";

interface TitleProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

export function Title({ id, children, className }: TitleProps) {
  return (
    <h2
      id={id}
      className={cn(
        "font-dm-serif-display text-3xl leading-tight text-black sm:text-3xl",
        className,
      )}
    >
      {children}
    </h2>
  );
}
