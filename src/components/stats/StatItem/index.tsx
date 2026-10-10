import type { Stat } from "@/data/stats";
import { cn } from "@/lib/utils";

export function StatItem({
  stat,
  className,
}: {
  stat: Stat;
  className?: string;
}) {
  return (
    <div className={cn("text-center border-r border-beige/60", className)}>
      <p className="font-dm-serif-display font-medium text-2xl text-petrol-blue sm:text-3xl">
        {stat.value}
      </p>
      <p className="mt-1 text-sm text-petrol-blue font-normal">{stat.label}</p>
    </div>
  );
}
