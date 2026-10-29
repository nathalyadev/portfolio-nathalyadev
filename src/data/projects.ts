export type ProjectMeta = {
  client: string;
  duration: string;
  team: string;
  platform: string;
  technologies: string[];
};

export type DesignSystem = {
  colors: { name: string; hex: string }[];
  typography: { role: string; font: string }[];
};

export const PROJECT_CATEGORIES = [
  "E-commerce",
  "Landing Page",
  "Web App",
  "Sistemas Administrativos",
  "UI Design",
] as const;

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];

export type Project = {
  id: string;
  category: ProjectCategory;
  disciplines: string;
  title: string;
  tagline: string;
  description: string;
  about: string[];
  tags: string[];
  image: string;
  gallery: string[];
  href?: string;
  /** ISO date — usado para ordenar por mais recente */
  date: string;
  meta: ProjectMeta;
  uxCases: string[];
  designSystem: DesignSystem;
  development: string[];
  results: string[];
};

export const PROJECTS: Project[] = [
  {
    id: "nfb",
    category: "E-commerce",
    disciplines: "UX/UI • E-COMMERCE",
    title: "NFB — Natural Beauty",
    tagline: "Beleza, tecnologia e uma experiência incrível.",
    description:
      "Uma plataforma de e-commerce de beleza e bem-estar que combina estética, usabilidade e performance. O projeto foi desenvolvido com foco em uma navegação fluida, design sofisticado e uma jornada de compra intuitiva, que valoriza a experiência da marca e do usuário.",
    about: [
      "O desafio era criar uma experiência de compra que unisse beleza e performance, com navegação clara e hierarquia visual forte.",
      "A plataforma foi pensada para destacar produtos naturais, reforçar confiança da marca e conduzir o visitante até a conversão com fluidez.",
    ],
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    image: "/images/projects/nfb.webp",
    gallery: [
      "/images/projects/nfb.webp",
      "/images/projects/nfb.webp",
      "/images/projects/nfb.webp",
    ],
    date: "2025-09-15",
    meta: {
      client: "Natural Beauty (Fictício)",
      duration: "6 semanas",
      team: "1 desenvolvedora",
      platform: "Web",
      technologies: ["Next.js", "TypeScript", "React"],
    },
    uxCases: [
      "Jornada do usuário",
      "Arquitetura da informação",
      "Wireframes e prototipagem",
      "Decisões de interface",
    ],
    designSystem: {
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
    },
    development: [
      "Componentização com React e TypeScript",
      "Layout responsivo com Tailwind CSS",
      "Otimização de imagens e Core Web Vitals",
      "Estrutura preparada para SEO e acessibilidade",
    ],
    results: [
      "Hierarquia visual clara para conversão",
      "Experiência consistente em desktop e mobile",
      "Base reutilizável para evolução do e-commerce",
    ],
  },
  {
    id: "mypizza",
    category: "Landing Page",
    disciplines: "UX/UI • FOOD TECH",
    title: "MyPizza",
    tagline: "Apetite, contraste e pedido em poucos cliques.",
    description:
      "Landing page para pizzaria artesanal, com cardápio visual e chamada para pedido.",
    about: [
      "O objetivo era transmitir o sabor e a identidade da marca logo no primeiro scroll, com uma estética escura e imagens de alto impacto.",
      "A interface organiza o cardápio, reforça a proposta artesanal e facilita o caminho até o pedido com CTAs bem posicionados.",
    ],
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    image: "/images/projects/mypizza.webp",
    gallery: [
      "/images/projects/mypizza.webp",
      "/images/projects/mypizza.webp",
      "/images/projects/mypizza.webp",
    ],
    date: "2025-06-20",
    meta: {
      client: "MyPizza",
      duration: "4 semanas",
      team: "1 desenvolvedora",
      platform: "Web",
      technologies: ["Next.js", "TypeScript", "React"],
    },
    uxCases: [
      "Mapa da jornada de pedido",
      "Hierarquia do cardápio",
      "Protótipos de alta fidelidade",
      "Microinterações de CTA",
    ],
    designSystem: {
      colors: [
        { name: "Cream", hex: "#F7F3ED" },
        { name: "Charcoal", hex: "#1A1A1A" },
        { name: "Accent", hex: "#C45C26" },
        { name: "Muted", hex: "#8A8A8A" },
      ],
      typography: [
        { role: "Títulos", font: "DM Serif Display" },
        { role: "Texto", font: "Manrope" },
      ],
    },
    development: [
      "Landing page performática em Next.js",
      "Seções modulares para cardápio e CTA",
      "Tipografia e contraste otimizados para leitura",
      "Responsividade mobile-first",
    ],
    results: [
      "Narrativa visual forte da marca",
      "Fluxo de pedido mais direto",
      "Layout pronto para campanhas e variações sazonais",
    ],
  },
  {
    id: "institucional",
    category: "Web App",
    disciplines: "PRODUCT • SAAS",
    title: "Compresskly",
    tagline: "Comprimir arquivos sem perder qualidade nem tempo.",
    description:
      "Ferramenta web para comprimir imagens e vídeos de forma prática, reduzindo o tamanho dos arquivos sem comprometer a qualidade.",
    about: [
      "O desafio era transformar uma tarefa técnica em um fluxo simples: enviar, comprimir e baixar com feedback claro em cada etapa.",
      "A interface prioriza clareza, estados de progresso e uma área de upload intuitiva para uso frequente no dia a dia.",
    ],
    tags: ["React", "Next.js", "TypeScript", "UI/UX", "C#"],
    image: "/images/projects/compresskly.webp",
    gallery: [
      "/images/projects/compresskly.webp",
      "/images/projects/compresskly.webp",
      "/images/projects/compresskly.webp",
    ],
    date: "2025-11-01",
    meta: {
      client: "Compresskly",
      duration: "8 semanas",
      team: "1 desenvolvedora",
      platform: "Web",
      technologies: ["Next.js", "TypeScript", "C#"],
    },
    uxCases: [
      "Fluxo de upload e compressão",
      "Estados vazios e de progresso",
      "Wireframes do dashboard",
      "Padronização de feedback visual",
    ],
    designSystem: {
      colors: [
        { name: "Surface", hex: "#F7F3ED" },
        { name: "Petrol", hex: "#28545A" },
        { name: "Ink", hex: "#181818" },
        { name: "Border", hex: "#DCD5CC" },
      ],
      typography: [
        { role: "Títulos", font: "DM Serif Display" },
        { role: "Texto", font: "Manrope" },
      ],
    },
    development: [
      "Dashboard em React com TypeScript",
      "Integração com backend em C#",
      "UI de upload com estados acessíveis",
      "Organização de componentes reutilizáveis",
    ],
    results: [
      "Fluxo de compressão mais objetivo",
      "Interface pronta para escala de arquivos",
      "Experiência consistente entre desktop e mobile",
    ],
  },
];

export function getProjectById(id: string) {
  return PROJECTS.find((project) => project.id === id);
}

export function filterProjects(
  projects: Project[],
  category: ProjectCategory | "Todos",
  sortByRecent = false,
) {
  const filtered =
    category === "Todos"
      ? projects
      : projects.filter((project) => project.category === category);

  if (!sortByRecent) return filtered;

  return [...filtered].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}
