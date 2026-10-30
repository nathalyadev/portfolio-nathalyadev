import { NextResponse, type NextRequest } from "next/server";

import { PROJECTS } from "@/data/projects";
import { assertLocalDevApiAccess } from "@/lib/local-dev";
import { getAllProjects, getLocalProjects } from "@/lib/projects-local-store";

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
