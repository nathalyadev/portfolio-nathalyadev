import type { NextRequest } from "next/server";

export function isLocalDevelopment() {
  return process.env.NODE_ENV === "development";
}

/** Bloqueia rotas de cadastro fora do ambiente de desenvolvimento. */
export function isLocalDevRouteAllowed() {
  return isLocalDevelopment();
}

export function isLocalHostRequest(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  return (
    host.startsWith("localhost:") ||
    host === "localhost" ||
    host.startsWith("127.0.0.1:") ||
    host === "127.0.0.1" ||
    host.startsWith("[::1]:")
  );
}

export function assertLocalDevApiAccess(request: NextRequest) {
  if (!isLocalDevRouteAllowed()) {
    return { ok: false as const, status: 404 };
  }
  if (!isLocalHostRequest(request)) {
    return { ok: false as const, status: 403 };
  }
  return { ok: true as const };
}
