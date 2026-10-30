import { NextResponse, type NextRequest } from "next/server";

import { assertLocalDevApiAccess } from "@/lib/local-dev";
import { deleteLocalProject } from "@/lib/projects-local-store";

import { revalidateProjectViews } from "../shared";

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
