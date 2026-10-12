import { HiArrowLongRight } from "react-icons/hi2";
import type { Service } from "@/data/services";
import { cn } from "@/lib/utils";

export function ServiceCard({
  service,
  className,
}: {
  service: Service;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "group flex h-full flex-col",
        "gap-3 py-6",
        "sm:bg-cream sm:p-6",
        className,
      )}
    >
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-beige">{service.number}</span>
        <h3 className="text-lg font-semibold text-black">{service.title}</h3>
      </div>

      <p className="flex-1 text-sm leading-relaxed text-gray">
        {service.description}
      </p>

      <HiArrowLongRight
        aria-hidden
        className="mt-3 size-5 text-petrol-blue transition-transform group-hover:translate-x-1"
      />
    </article>
  );
}
