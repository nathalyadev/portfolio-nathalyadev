"use client";

import { useState } from "react";
import { PROJECTS, type Project } from "@/data/projects";
import { ProjectCard } from "../ProjectCard";
import { ProjectDetailModal } from "../ProjectDetailModal";
import { cn } from "@/lib/utils";

export function ProjectsGrid({
  projects = PROJECTS,
  className,
  selectedId: selectedIdProp,
  onProjectChange,
}: {
  projects?: Project[];
  className?: string;
  selectedId?: string | null;
  onProjectChange?: (projectId: string | null) => void;
}) {
  const [localId, setLocalId] = useState<string | null>(selectedIdProp ?? null);

  // Mantém o modal responsivo mesmo quando a URL ainda não atualizou
  if (selectedIdProp !== undefined && selectedIdProp !== localId) {
    setLocalId(selectedIdProp);
  }

  const selected =
    localId != null
      ? (projects.find((item) => item.id === localId) ?? null)
      : null;

  const openDetails = (project: Project) => {
    setLocalId(project.id);
    onProjectChange?.(project.id);
  };

  const handleOpenChange = (open: boolean) => {
    if (open) return;
    setLocalId(null);
    onProjectChange?.(null);
  };

  if (projects.length === 0) {
    return (
      <p className="py-16 text-center text-base text-gray">
        Nenhum projeto encontrado para este filtro.
      </p>
    );
  }

  return (
    <>
      <div
        className={cn(
          "grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-14",
          className,
        )}
      >
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onOpenDetails={openDetails}
          />
        ))}
      </div>

      <ProjectDetailModal
        project={selected}
        open={selected != null}
        onOpenChange={handleOpenChange}
      />
    </>
  );
}
