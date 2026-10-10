import {
  HiBriefcase,
  HiCodeBracket,
  HiMapPin,
  HiSparkles,
} from "react-icons/hi2";
import type { AboutInfoItem } from "@/data/about";
import { cn } from "@/lib/utils";

const ICONS = {
  experiencia: HiBriefcase,
  especialidade: HiCodeBracket,
  foco: HiSparkles,
  localizacao: HiMapPin,
} as const;

export function AboutInfo({
  items,
  className,
}: {
  items: AboutInfoItem[];
  className?: string;
}) {
  return (
    <ul className={cn("flex flex-col gap-5 h-full justify-center", className)}>
      {items.map((item) => {
        const Icon = ICONS[item.id as keyof typeof ICONS] ?? HiSparkles;

        return (
          <li key={item.id} className="flex items-start gap-3">
            <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full bg-secondary text-petrol-blue">
              <Icon className="size-4" aria-hidden />
            </span>
            <div>
              <p className="text-xs font-semibold tracking-[0.12em] text-petrol-blue uppercase">
                {item.label}
              </p>
              <p className="mt-1 text-sm font-medium text-black">{item.value}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
