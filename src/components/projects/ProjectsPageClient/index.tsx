"use client";

import { useCallback, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ProjectsGrid } from "../ProjectsGrid";

export function ProjectsPageClient() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const projectQuery = searchParams.get("projeto");

  // undefined = confiar na URL; string/null = override local (abrir/fechar na hora)
  const [localId, setLocalId] = useState<string | null | undefined>(undefined);
  const selectedId = localId !== undefined ? localId : projectQuery;

  if (localId !== undefined && localId === projectQuery) {
    setLocalId(undefined);
  }

  const handleProjectChange = useCallback(
    (projectId: string | null) => {
      setLocalId(projectId);

      const params = new URLSearchParams(searchParams.toString());

      if (projectId) {
        params.set("projeto", projectId);
      } else {
        params.delete("projeto");
      }

      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, {
        scroll: false,
      });
    },
    [pathname, router, searchParams],
  );

  return (
    <ProjectsGrid
      selectedId={selectedId}
      onProjectChange={handleProjectChange}
    />
  );
}
