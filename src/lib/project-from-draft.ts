import {
  PROJECT_CATEGORIES,
  type Project,
  type ProjectCategory,
} from "@/data/projects";

const DEFAULT_IMAGE = "/images/projects/thumbnail.svg";

const DEFAULT_DESIGN_SYSTEM: Project["designSystem"] = {
  colors: [
    { name: "Off-white", hex: "#F7F3ED" },
    { name: "Petrol", hex: "#28545A" },
    { name: "Black", hex: "#181818" },
    { name: "Gray", hex: "#5C5C5C" },
  ],
  typography: [
    { role: "Títulos", font: "DM Serif Display" },
    { role: "Texto", font: "Manrope" },
  ],
};

const CATEGORY_DISCIPLINES: Record<ProjectCategory, string> = {
  "E-commerce": "UX/UI • E-COMMERCE",
  "Landing Page": "UX/UI • LANDING PAGE",
  "Web App": "PRODUCT • WEB APP",
  "Sistemas Administrativos": "UX/UI • SISTEMAS",
  "UI Design": "UI • DESIGN",
};

export type ProjectQuickDraft = {
  id?: string;
  title: string;
  category: ProjectCategory;
  disciplines?: string;
  tagline: string;
  description: string;
  tags: string;
  image?: string;
  date?: string;
  href?: string;
  client?: string;
  duration?: string;
  /** Visão geral — parágrafos de “Sobre o projeto” (uma linha = um parágrafo) */
  about?: string;
  /** Visão geral — miniaturas da galeria (uma URL por linha, até 3) */
  gallery?: string;
  /** Casos de UX — um item por linha */
  uxCases?: string;
  /** Design System — cores: “Nome #HEX” por linha */
  designSystemColors?: string;
  /** Design System — tipografia: “Papel | Fonte” por linha */
  designSystemTypography?: string;
  /** Desenvolvimento — um item por linha */
  development?: string;
  /** Resultados — um item por linha */
  results?: string;
};

export function slugifyProjectId(title: string) {
  return title
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);
}

function parseTags(raw: string) {
  return raw
    .split(/[,;]+/)
    .map((tag) => tag.trim())
    .filter(Boolean);
}

function todayIsoDate() {
  return new Date().toISOString().slice(0, 10);
}

function parseLines(raw?: string) {
  if (raw == null || !raw.trim()) return undefined;
  const lines = raw
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
  return lines.length > 0 ? lines : undefined;
}

function parseGallery(raw: string | undefined, mainImage: string) {
  const lines = parseLines(raw);
  if (!lines) return undefined;
  const items = lines.slice(0, 3);
  while (items.length < 3) {
    items.push(items[items.length - 1] ?? mainImage);
  }
  return items;
}

function parseDesignSystemColors(
  raw?: string,
): Project["designSystem"]["colors"] | undefined {
  const lines = parseLines(raw);
  if (!lines) return undefined;

  const colors = lines
    .map((line) => {
      const pipe = line.match(/^(.+?)\s*[|–-]\s*(#?[0-9A-Fa-f]{6})$/);
      if (pipe) {
        return {
          name: pipe[1].trim(),
          hex: pipe[2].startsWith("#") ? pipe[2] : `#${pipe[2]}`,
        };
      }
      const spaced = line.match(/^(.+?)\s+(#?[0-9A-Fa-f]{6})$/);
      if (spaced) {
        return {
          name: spaced[1].trim(),
          hex: spaced[2].startsWith("#") ? spaced[2] : `#${spaced[2]}`,
        };
      }
      return null;
    })
    .filter(Boolean) as Project["designSystem"]["colors"];

  return colors.length > 0 ? colors : undefined;
}

function parseDesignSystemTypography(
  raw?: string,
): Project["designSystem"]["typography"] | undefined {
  const lines = parseLines(raw);
  if (!lines) return undefined;

  const typography = lines
    .map((line) => {
      const parts = line.split(/\s*[|:–-]\s*/);
      if (parts.length >= 2) {
        return {
          role: parts[0].trim(),
          font: parts.slice(1).join(" - ").trim(),
        };
      }
      return null;
    })
    .filter(Boolean) as Project["designSystem"]["typography"];

  return typography.length > 0 ? typography : undefined;
}

function defaultAboutFromDraft(draft: ProjectQuickDraft) {
  return [
    draft.description,
    "Detalhes do case podem ser refinados depois no arquivo de dados principal.",
  ];
}

function defaultModalContent(image: string) {
  return {
    gallery: [image, image, image] as string[],
    uxCases: [
      "Jornada do usuário",
      "Arquitetura da informação",
      "Wireframes e prototipagem",
      "Decisões de interface",
    ],
    designSystem: DEFAULT_DESIGN_SYSTEM,
    development: [
      "Componentização com React e TypeScript",
      "Layout responsivo com Tailwind CSS",
      "Otimização de imagens e Core Web Vitals",
      "Estrutura preparada para SEO e acessibilidade",
    ],
    results: [
      "Interface clara e consistente com a marca",
      "Experiência responsiva em desktop e mobile",
      "Base pronta para evolução do produto",
    ],
  };
}

function applyModalDraftFields(
  draft: ProjectQuickDraft,
  image: string,
  fallback: Pick<
    Project,
    "about" | "gallery" | "uxCases" | "designSystem" | "development" | "results"
  >,
) {
  const about = parseLines(draft.about) ?? fallback.about;
  const gallery = parseGallery(draft.gallery, image) ?? fallback.gallery;
  const uxCases = parseLines(draft.uxCases) ?? fallback.uxCases;
  const colors =
    parseDesignSystemColors(draft.designSystemColors) ??
    fallback.designSystem.colors;
  const typography =
    parseDesignSystemTypography(draft.designSystemTypography) ??
    fallback.designSystem.typography;
  const development = parseLines(draft.development) ?? fallback.development;
  const results = parseLines(draft.results) ?? fallback.results;

  return {
    about,
    gallery,
    uxCases,
    designSystem: { colors, typography },
    development,
    results,
  };
}

export function createProjectFromDraft(draft: ProjectQuickDraft): Project {
  const category = PROJECT_CATEGORIES.includes(draft.category)
    ? draft.category
    : "Web App";

  const id = (draft.id?.trim() || slugifyProjectId(draft.title)).replace(
    /[^a-z0-9-]/gi,
    "",
  );

  const tags = parseTags(draft.tags);
  const image = draft.image?.trim() || DEFAULT_IMAGE;
  const date = draft.date?.trim() || todayIsoDate();
  const client = draft.client?.trim() || draft.title;
  const duration = draft.duration?.trim() || "4 semanas";
  const disciplines =
    draft.disciplines?.trim() || CATEGORY_DISCIPLINES[category];

  const modalDefaults = defaultModalContent(image);
  const modal = applyModalDraftFields(draft, image, {
    about: defaultAboutFromDraft(draft),
    gallery: modalDefaults.gallery,
    uxCases: modalDefaults.uxCases,
    designSystem: modalDefaults.designSystem,
    development: modalDefaults.development,
    results: modalDefaults.results,
  });

  return {
    id,
    category,
    disciplines,
    title: draft.title.trim(),
    tagline: draft.tagline.trim(),
    description: draft.description.trim(),
    about: modal.about,
    tags: tags.length > 0 ? tags : ["Next.js", "TypeScript"],
    image,
    gallery: modal.gallery,
    href: draft.href?.trim() || undefined,
    date,
    meta: {
      client,
      duration,
      team: "1 desenvolvedora",
      platform: "Web",
      technologies: tags.length > 0 ? tags : ["Next.js", "TypeScript"],
    },
    uxCases: modal.uxCases,
    designSystem: modal.designSystem,
    development: modal.development,
    results: modal.results,
  };
}

export function formatProjectForCopy(project: Project) {
  return JSON.stringify(project, null, 2);
}

export function projectToQuickDraft(project: Project): ProjectQuickDraft {
  return {
    id: project.id,
    title: project.title,
    category: project.category,
    disciplines: project.disciplines,
    tagline: project.tagline,
    description: project.description,
    tags: project.tags.join(", "),
    image: project.image,
    date: project.date,
    href: project.href ?? "",
    client: project.meta.client,
    duration: project.meta.duration,
    about: project.about.join("\n"),
    gallery: project.gallery.join("\n"),
    uxCases: project.uxCases.join("\n"),
    designSystemColors: project.designSystem.colors
      .map((color) => `${color.name} ${color.hex}`)
      .join("\n"),
    designSystemTypography: project.designSystem.typography
      .map((item) => `${item.role} | ${item.font}`)
      .join("\n"),
    development: project.development.join("\n"),
    results: project.results.join("\n"),
  };
}

export function applyDraftToProject(
  base: Project,
  draft: ProjectQuickDraft,
): Project {
  const category = PROJECT_CATEGORIES.includes(draft.category)
    ? draft.category
    : base.category;

  const tags = parseTags(draft.tags);
  const image = draft.image?.trim() || base.image;
  const imageChanged = image !== base.image;
  const gallery =
    imageChanged && base.gallery.every((item) => item === base.image)
      ? [image, image, image]
      : imageChanged
        ? base.gallery.map((item) => (item === base.image ? image : item))
        : base.gallery;

  const id = (draft.id?.trim() || base.id).replace(/[^a-z0-9-]/gi, "");

  const modal = applyModalDraftFields(draft, image, {
    about: base.about,
    gallery,
    uxCases: base.uxCases,
    designSystem: base.designSystem,
    development: base.development,
    results: base.results,
  });

  return {
    ...base,
    id,
    category,
    disciplines:
      draft.disciplines?.trim() ||
      base.disciplines ||
      CATEGORY_DISCIPLINES[category],
    title: draft.title.trim(),
    tagline: draft.tagline.trim(),
    description: draft.description.trim(),
    tags: tags.length > 0 ? tags : base.tags,
    image,
    gallery: modal.gallery,
    href: draft.href?.trim() || undefined,
    date: draft.date?.trim() || base.date,
    meta: {
      ...base.meta,
      client: draft.client?.trim() || base.meta.client,
      duration: draft.duration?.trim() || base.meta.duration,
      technologies: tags.length > 0 ? tags : base.meta.technologies,
    },
    about: modal.about,
    uxCases: modal.uxCases,
    designSystem: modal.designSystem,
    development: modal.development,
    results: modal.results,
  };
}
