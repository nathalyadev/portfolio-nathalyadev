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
    <div className={cn("text-center sm:text-left", className)}>
      <p className="font-dm-serif-display text-2xl text-black sm:text-3xl">
        {stat.value}
      </p>
      <p className="mt-1 text-sm text-gray">{stat.label}</p>
    </div>
  );
}
