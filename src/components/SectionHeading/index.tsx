import { cn } from "@/lib/utils";

export function SectionHeading({
  label,
  title,
  titleId,
  description,
  className,
  align = "left",
  action,
}: {
  label?: string;
  title: string;
  titleId?: string;
  description?: string;
  className?: string;
  align?: "left" | "center";
  action?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        action && "sm:flex-row sm:items-end sm:justify-between sm:gap-8",
        className,
      )}
    >
      <div
        className={cn(
          "flex max-w-2xl flex-col gap-3",
          align === "center" && "items-center",
        )}
      >
        {label ? (
          <span className="text-xs font-semibold tracking-[0.18em] text-petrol-blue uppercase">
            {label}
          </span>
        ) : null}
        <h2
          id={titleId}
          className="font-dm-serif-display font-medium text-3xl leading-tight text-black sm:text-4xl lg:text-[2.75rem]"
        >
          {title}
        </h2>
        {description ? (
          <p className="max-w-xl text-base leading-relaxed text-gray">
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
