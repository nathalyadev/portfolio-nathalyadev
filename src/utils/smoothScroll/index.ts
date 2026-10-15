function scrollBehavior(): ScrollBehavior {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? "auto"
    : "smooth";
}

export function smoothScrollToTop() {
  window.scrollTo({ top: 0, behavior: scrollBehavior() });
}

export function smoothScrollToId(id: string) {
  const element = document.getElementById(id);

  if (!element) {
    return false;
  }

  element.scrollIntoView({ behavior: scrollBehavior(), block: "start" });
  return true;
}

/** Navega suavemente na mesma página e atualiza a URL. Retorna o hash resultante. */
export function navigateInPage(href: string) {
  const hashIndex = href.indexOf("#");
  const hash = hashIndex === -1 ? "" : href.slice(hashIndex);

  if (!hash) {
    smoothScrollToTop();
    window.history.pushState(null, "", "/");
    return "";
  }

  smoothScrollToId(hash.slice(1));
  window.history.pushState(null, "", `/${hash}`);
  return hash;
}
