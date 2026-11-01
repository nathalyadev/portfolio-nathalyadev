"use client";

import {
  PROJECT_CATEGORIES,
  type ProjectCategory,
} from "@/data/projects";
import { cn } from "@/lib/utils";
import {
  HiChevronLeft,
  HiChevronRight,
  HiOutlineArrowsUpDown,
} from "react-icons/hi2";
import { useCallback, useEffect, useRef, useState } from "react";

export type CategoryFilter = ProjectCategory | "Todos";

const CATEGORY_OPTIONS: CategoryFilter[] = ["Todos", ...PROJECT_CATEGORIES];

const CAROUSEL_MAX_WIDTH = "(max-width: 1023px)";

function useCategoryScrollState(scrollRef: React.RefObject<HTMLDivElement | null>) {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [overflows, setOverflows] = useState(false);

  const update = useCallback(() => {
    const node = scrollRef.current;
    if (!node) return;

    const { scrollLeft, scrollWidth, clientWidth } = node;
    const hasOverflow = scrollWidth - clientWidth > 4;
    setOverflows(hasOverflow);
    setCanScrollLeft(hasOverflow && scrollLeft > 4);
    setCanScrollRight(
      hasOverflow && scrollLeft + clientWidth < scrollWidth - 4,
    );
  }, [scrollRef]);

  useEffect(() => {
    const node = scrollRef.current;
    if (!node) return;

    update();

    node.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(node);

    return () => {
      node.removeEventListener("scroll", update);
      observer.disconnect();
    };
  }, [scrollRef, update]);

  return { canScrollLeft, canScrollRight, overflows, update };
}

export function ProjectsFilters({
  category,
  sortByRecent,
  onCategoryChange,
  onSortChange,
  className,
}: {
  category: CategoryFilter;
  sortByRecent: boolean;
  onCategoryChange: (category: CategoryFilter) => void;
  onSortChange: (sortByRecent: boolean) => void;
  className?: string;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { canScrollLeft, canScrollRight, overflows, update } =
    useCategoryScrollState(scrollRef);

  useEffect(() => {
    const node = scrollRef.current;
    if (!node) return;

    if (!window.matchMedia(CAROUSEL_MAX_WIDTH).matches) {
      update();
      return;
    }

    const active = node.querySelector<HTMLElement>(
      `[data-filter="${CSS.escape(category)}"]`,
    );
    if (!active) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    active.scrollIntoView({
      inline: "center",
      block: "nearest",
      behavior: reducedMotion ? "auto" : "smooth",
    });

    window.requestAnimationFrame(update);
  }, [category, update]);

  const scrollFilters = (direction: -1 | 1) => {
    const node = scrollRef.current;
    if (!node) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    node.scrollBy({
      left: direction * Math.max(node.clientWidth * 0.65, 160),
      behavior: reducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <div
      className={cn(
        "flex min-w-0 flex-col gap-4 lg:flex-row lg:flex-wrap lg:items-center lg:gap-x-4 lg:gap-y-3 xl:flex-nowrap xl:justify-between",
        className,
      )}
    >
      <div className="relative min-w-0 w-full lg:min-w-[min(100%,36rem)] lg:flex-1">
        {overflows ? (
          <p
            className="mb-2 text-xs text-gray lg:sr-only"
            id="projetos-filtros-dica"
          >
            Deslize horizontalmente para ver mais categorias.
          </p>
        ) : null}

        {canScrollLeft ? (
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-linear-to-r from-cream to-cream/0 lg:hidden"
            aria-hidden
          />
        ) : null}
        {canScrollRight ? (
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-linear-to-l from-cream to-cream/0 lg:hidden"
            aria-hidden
          />
        ) : null}

        {canScrollLeft ? (
          <button
            type="button"
            aria-label="Ver categorias anteriores"
            className="absolute top-1/2 left-0 z-20 flex size-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-beige bg-cream text-petrol-blue shadow-sm transition-colors hover:border-petrol-blue/40 lg:hidden"
            onClick={() => scrollFilters(-1)}
          >
            <HiChevronLeft className="size-4" aria-hidden />
          </button>
        ) : null}
        {canScrollRight ? (
          <button
            type="button"
            aria-label="Ver próximas categorias"
            className="absolute top-1/2 right-0 z-20 flex size-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-beige bg-cream text-petrol-blue shadow-sm transition-colors hover:border-petrol-blue/40 lg:hidden"
            onClick={() => scrollFilters(1)}
          >
            <HiChevronRight className="size-4" aria-hidden />
          </button>
        ) : null}

        <div
          ref={scrollRef}
          role="tablist"
          aria-label="Filtrar projetos por categoria"
          aria-describedby={overflows ? "projetos-filtros-dica" : undefined}
          className={cn(
            "flex min-w-0 gap-2 pb-1 scrollbar-none",
            "max-lg:overflow-x-auto max-lg:overscroll-x-contain max-lg:scroll-smooth",
            "max-lg:snap-x max-lg:snap-mandatory max-lg:[-webkit-overflow-scrolling:touch]",
            "lg:flex-wrap lg:overflow-visible xl:flex-nowrap",
            overflows ? "max-lg:px-9" : "px-0.5",
          )}
        >
          {CATEGORY_OPTIONS.map((option) => {
            const isActive = category === option;

            return (
              <button
                key={option}
                type="button"
                role="tab"
                data-filter={option}
                aria-selected={isActive}
                onClick={() => onCategoryChange(option)}
                className={cn(
                  "max-lg:snap-start shrink-0 cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "border-petrol-blue bg-petrol-blue text-cream"
                    : "border-beige bg-transparent text-gray hover:border-petrol-blue/40 hover:text-petrol-blue",
                )}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>

      <button
        type="button"
        aria-pressed={sortByRecent}
        onClick={() => onSortChange(!sortByRecent)}
        className={cn(
          "inline-flex w-full shrink-0 cursor-pointer items-center justify-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors lg:w-auto lg:justify-start",
          sortByRecent
            ? "border-petrol-blue bg-petrol-blue/10 text-petrol-blue"
            : "border-beige text-gray hover:border-petrol-blue/40 hover:text-petrol-blue",
        )}
      >
        <HiOutlineArrowsUpDown className="size-4" aria-hidden />
        Mais recente
      </button>
    </div>
  );
}
