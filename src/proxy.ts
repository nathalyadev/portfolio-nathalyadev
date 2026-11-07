import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { isLocalDevRouteAllowed } from "@/lib/local-dev";

export function proxy(request: NextRequest) {
  if (!isLocalDevRouteAllowed()) {
    return new NextResponse(null, { status: 404 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/local/:path*", "/api/local/:path*"],
};
