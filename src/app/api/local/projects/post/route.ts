import { NextResponse, type NextRequest } from "next/server";

import { assertLocalDevApiAccess } from "@/lib/local-dev";
import {
  applyDraftToProject,
  createProjectFromDraft,
} from "@/lib/project-from-draft";
import { saveLocalProject } from "@/lib/projects-local-store";

import { isProject, parseDraft, revalidateProjectViews } from "../shared";

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
