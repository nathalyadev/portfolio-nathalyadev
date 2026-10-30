import fs from "fs/promises";
import path from "path";

import type { Project } from "@/data/projects";
import { PROJECTS } from "@/data/projects";
import { isLocalDevelopment } from "@/lib/local-dev";

const LOCAL_PROJECTS_PATH = path.join(
  process.cwd(),
  "src/data/projects.local.json",
);

async function readLocalProjectsFile(): Promise<Project[]> {
  try {
    const raw = await fs.readFile(LOCAL_PROJECTS_PATH, "utf-8");
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed as Project[];
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      await fs.writeFile(LOCAL_PROJECTS_PATH, "[]\n", "utf-8");
      return [];
    }
    throw error;
  }
}

export async function getLocalProjects(): Promise<Project[]> {
  if (!isLocalDevelopment()) return [];
  return readLocalProjectsFile();
}

export async function getAllProjects(): Promise<Project[]> {
  if (!isLocalDevelopment()) {
    return PROJECTS;
  }

  const local = await getLocalProjects();
  const localById = new Map(local.map((project) => [project.id, project]));
  const seedIds = new Set(PROJECTS.map((project) => project.id));

  const mergedSeed = PROJECTS.map(
    (project) => localById.get(project.id) ?? project,
  );
  const extra = local.filter((project) => !seedIds.has(project.id));

  return [...mergedSeed, ...extra];
}

export async function saveLocalProject(project: Project, previousId?: string) {
  let local = await readLocalProjectsFile();
  const fromId = previousId?.trim() || project.id;
  const withoutPrevious = local.filter((item) => item.id !== fromId);
  const index = withoutPrevious.findIndex((item) => item.id === project.id);

  const next =
    index === -1
      ? [...withoutPrevious, project]
      : withoutPrevious.map((item, i) => (i === index ? project : item));

  await fs.writeFile(
    LOCAL_PROJECTS_PATH,
    `${JSON.stringify(next, null, 2)}\n`,
    "utf-8",
  );

  return project;
}

export async function deleteLocalProject(id: string) {
  const local = await readLocalProjectsFile();
  const next = local.filter((project) => project.id !== id);
  await fs.writeFile(
    LOCAL_PROJECTS_PATH,
    `${JSON.stringify(next, null, 2)}\n`,
    "utf-8",
  );
  return next;
}
