export function isActivePath(pathname: string, href: string, hash = "") {
  const hashIndex = href.indexOf("#");
  const hrefPath = (hashIndex === -1 ? href : href.slice(0, hashIndex)) || "/";
  const hrefHash = hashIndex === -1 ? "" : href.slice(hashIndex);
  const currentHash =
    !hash || hash.startsWith("#") ? hash : `#${hash}`;

  // Rotas dedicadas (ex.: /projetos) — ativo pelo pathname, sem depender de hash
  if (hrefPath !== "/" && !hrefHash) {
    return pathname === hrefPath || pathname.startsWith(`${hrefPath}/`);
  }

  if (pathname !== hrefPath) {
    return false;
  }

  // Início (/): ativo sem hash de seção, ou com #inicio
  if (!hrefHash) {
    return currentHash === "" || currentHash === "#inicio";
  }

  return currentHash === hrefHash;
}
