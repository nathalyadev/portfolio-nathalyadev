import { revalidatePath } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";

import {
  PROJECTS,
  PROJECT_CATEGORIES,
  type Project,
  type ProjectCategory,
} from "@/data/projects";
import { assertLocalDevApiAccess } from "@/lib/local-dev";
import {
  applyDraftToProject,
  createProjectFromDraft,
  type ProjectQuickDraft,
} from "@/lib/project-from-draft";
import { getAllProjects } from "@/lib/projects-local-store";
import {
  deleteLocalProject,
  getLocalProjects,
  saveLocalProject,
} from "@/lib/projects-local-store";

function parseCategory(value: unknown): ProjectCategory | null {
  if (typeof value !== "string") return null;
  return PROJECT_CATEGORIES.includes(value as ProjectCategory)
    ? (value as ProjectCategory)
    : null;
}

function parseDraft(body: unknown): ProjectQuickDraft | null {
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

function revalidateProjectViews() {
  revalidatePath("/");
  revalidatePath("/projetos");
}

export async function GET(request: NextRequest) {
  const access = assertLocalDevApiAccess(request);
  if (!access.ok) {
    return new NextResponse(null, { status: access.status });
  }

  const [local, catalog] = await Promise.all([
    getLocalProjects(),
    getAllProjects(),
  ]);

  const localIds = new Set(local.map((project) => project.id));
  const seedIds = new Set(PROJECTS.map((project) => project.id));

  return NextResponse.json({
    local,
    catalog: catalog.map((project) => ({
      project,
      inLocalFile: localIds.has(project.id),
      isSeed: seedIds.has(project.id),
    })),
  });
}

function isProject(value: unknown): value is Project {
  if (!value || typeof value !== "object") return false;
  const data = value as Record<string, unknown>;
  return typeof data.id === "string" && typeof data.title === "string";
}

export async function POST(request: NextRequest) {
  const access = assertLocalDevApiAccess(request);
  if (!access.ok) {
    return new NextResponse(null, { status: access.status });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const payload = body as Record<string, unknown>;
  const draft = parseDraft(payload);
  if (!draft) {
    return NextResponse.json(
      { error: "Campos obrigatórios ausentes ou inválidos" },
      { status: 400 },
    );
  }

  const previousId =
    typeof payload.previousId === "string" ? payload.previousId : undefined;
  const base = isProject(payload.base) ? payload.base : undefined;

  const project = base
    ? applyDraftToProject(base, draft)
    : createProjectFromDraft(draft);

  await saveLocalProject(project, previousId);
  revalidateProjectViews();

  return NextResponse.json({ project });
}

export async function DELETE(request: NextRequest) {
  const access = assertLocalDevApiAccess(request);
  if (!access.ok) {
    return new NextResponse(null, { status: access.status });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "id é obrigatório" }, { status: 400 });
  }

  const projects = await deleteLocalProject(id);
  revalidateProjectViews();

  return NextResponse.json({ projects });
}
