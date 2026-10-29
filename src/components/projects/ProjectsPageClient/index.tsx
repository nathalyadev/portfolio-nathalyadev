"use client";

import { useCallback, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  filterProjects,
  PROJECT_CATEGORIES,
  PROJECTS,
  type ProjectCategory,
} from "@/data/projects";
import {
  ProjectsFilters,
  type CategoryFilter,
} from "../ProjectsFilters";
import { ProjectsGrid } from "../ProjectsGrid";

function parseCategory(value: string | null): CategoryFilter {
  if (!value || value === "Todos") return "Todos";
  return PROJECT_CATEGORIES.includes(value as ProjectCategory)
    ? (value as ProjectCategory)
    : "Todos";
}

export function ProjectsPageClient() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const projectQuery = searchParams.get("projeto");

  const category = parseCategory(searchParams.get("categoria"));
  const sortByRecent = searchParams.get("ordem") === "recente";

  // undefined = confiar na URL; string/null = override local (abrir/fechar na hora)
  const [localId, setLocalId] = useState<string | null | undefined>(undefined);
  const selectedId = localId !== undefined ? localId : projectQuery;

  if (localId !== undefined && localId === projectQuery) {
    setLocalId(undefined);
  }

  const filteredProjects = useMemo(
    () => filterProjects(PROJECTS, category, sortByRecent),
    [category, sortByRecent],
  );

  const updateParams = useCallback(
    (mutate: (params: URLSearchParams) => void) => {
      const params = new URLSearchParams(searchParams.toString());
      mutate(params);
      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, {
        scroll: false,
      });
    },
    [pathname, router, searchParams],
  );

  const handleProjectChange = useCallback(
    (projectId: string | null) => {
      setLocalId(projectId);

      updateParams((params) => {
        if (projectId) {
          params.set("projeto", projectId);
        } else {
          params.delete("projeto");
        }
      });
    },
    [updateParams],
  );

  const handleCategoryChange = useCallback(
    (next: CategoryFilter) => {
      updateParams((params) => {
        if (next === "Todos") {
          params.delete("categoria");
        } else {
          params.set("categoria", next);
        }
      });
    },
    [updateParams],
  );

  const handleSortChange = useCallback(
    (next: boolean) => {
      updateParams((params) => {
        if (next) {
          params.set("ordem", "recente");
        } else {
          params.delete("ordem");
        }
      });
    },
    [updateParams],
  );

  return (
    <div className="flex flex-col gap-10">
      <ProjectsFilters
        category={category}
        sortByRecent={sortByRecent}
        onCategoryChange={handleCategoryChange}
        onSortChange={handleSortChange}
      />

      <ProjectsGrid
        projects={filteredProjects}
        selectedId={selectedId}
        onProjectChange={handleProjectChange}
      />
    </div>
  );
}
