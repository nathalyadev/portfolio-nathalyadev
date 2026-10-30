import { revalidatePath } from "next/cache";

import { PROJECT_CATEGORIES, type Project, type ProjectCategory } from "@/data/projects";
import type { ProjectQuickDraft } from "@/lib/project-from-draft";

function parseCategory(value: unknown): ProjectCategory | null {
  if (typeof value !== "string") return null;
  return PROJECT_CATEGORIES.includes(value as ProjectCategory)
    ? (value as ProjectCategory)
    : null;
}

export function parseDraft(body: unknown): ProjectQuickDraft | null {
  if (!body || typeof body !== "object") return null;
  const data = body as Record<string, unknown>;
  const category = parseCategory(data.category);
  if (
    typeof data.title !== "string" ||
    typeof data.tagline !== "string" ||
    typeof data.description !== "string" ||
    typeof data.tags !== "string" ||
    !category
  ) {
    return null;
  }

  return {
    id: typeof data.id === "string" ? data.id : undefined,
    title: data.title,
    category,
    disciplines:
      typeof data.disciplines === "string" ? data.disciplines : undefined,
    tagline: data.tagline,
    description: data.description,
    tags: data.tags,
    image: typeof data.image === "string" ? data.image : undefined,
    date: typeof data.date === "string" ? data.date : undefined,
    href: typeof data.href === "string" ? data.href : undefined,
    client: typeof data.client === "string" ? data.client : undefined,
    duration: typeof data.duration === "string" ? data.duration : undefined,
    about: typeof data.about === "string" ? data.about : undefined,
    gallery: typeof data.gallery === "string" ? data.gallery : undefined,
    uxCases: typeof data.uxCases === "string" ? data.uxCases : undefined,
    designSystemColors:
      typeof data.designSystemColors === "string"
        ? data.designSystemColors
        : undefined,
    designSystemTypography:
      typeof data.designSystemTypography === "string"
        ? data.designSystemTypography
        : undefined,
    development:
      typeof data.development === "string" ? data.development : undefined,
    results: typeof data.results === "string" ? data.results : undefined,
  };
}

export function isProject(value: unknown): value is Project {
  if (!value || typeof value !== "object") return false;
  const data = value as Record<string, unknown>;
  return typeof data.id === "string" && typeof data.title === "string";
}

export function revalidateProjectViews() {
  revalidatePath("/");
  revalidatePath("/projetos");
}
