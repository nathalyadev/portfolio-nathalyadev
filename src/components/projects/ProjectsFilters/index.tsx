"use client";

import {
  PROJECT_CATEGORIES,
  type ProjectCategory,
} from "@/data/projects";
import { cn } from "@/lib/utils";
import { HiOutlineArrowsUpDown } from "react-icons/hi2";

export type CategoryFilter = ProjectCategory | "Todos";

const CATEGORY_OPTIONS: CategoryFilter[] = ["Todos", ...PROJECT_CATEGORIES];

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
  return (
    <div
      className={cn(
        "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",
        className,
      )}
    >
      <div
        role="tablist"
        aria-label="Filtrar projetos por categoria"
        className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 scrollbar-none"
      >
        {CATEGORY_OPTIONS.map((option) => {
          const isActive = category === option;

          return (
            <button
              key={option}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onCategoryChange(option)}
              className={cn(
                "shrink-0 cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition-colors",
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

      <button
        type="button"
        aria-pressed={sortByRecent}
        onClick={() => onSortChange(!sortByRecent)}
        className={cn(
          "inline-flex shrink-0 cursor-pointer items-center gap-2 self-start rounded-full border px-4 py-2 text-sm font-medium transition-colors sm:self-auto",
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
