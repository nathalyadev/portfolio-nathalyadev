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
    image: "/images/projects/nfb-beauty/screenshot-1.webp",
    gallery: [
      "/images/projects/nfb-beauty/screenshot-1.webp",
      // "/images/projects/nfb-beauty/screenshot-2.webp",
      // "/images/projects/nfb-beauty/screenshot-3.webp",
    ],
    date: "2025-09-15",
    meta: {
      client: "Natural Beauty (Fictício)",
      duration: "Em desenvolvimento",
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
  // {
  //   id: "mypizza",
  //   category: "Landing Page",
  //   disciplines: "UX/UI • FOOD TECH",
  //   title: "MyPizza",
  //   tagline: "Apetite, contraste e pedido em poucos cliques.",
  //   description:
  //     "Landing page para pizzaria artesanal, com cardápio visual e chamada para pedido.",
  //   about: [
  //     "O objetivo era transmitir o sabor e a identidade da marca logo no primeiro scroll, com uma estética escura e imagens de alto impacto.",
  //     "A interface organiza o cardápio, reforça a proposta artesanal e facilita o caminho até o pedido com CTAs bem posicionados.",
  //   ],
  //   tags: ["Next.js", "TypeScript", "Tailwind CSS"],
  //   image: "/images/projects/mypizza.webp",
  //   gallery: [
  //     "/images/projects/mypizza.webp",
  //     "/images/projects/mypizza.webp",
  //     "/images/projects/mypizza.webp",
  //   ],
  //   date: "2025-06-20",
  //   meta: {
  //     client: "MyPizza",
  //     duration: "Em desenvolvimento",
  //     team: "1 desenvolvedora",
  //     platform: "Web",
  //     technologies: ["Next.js", "TypeScript", "React"],
  //   },
  //   uxCases: [
  //     "Mapa da jornada de pedido",
  //     "Hierarquia do cardápio",
  //     "Protótipos de alta fidelidade",
  //     "Microinterações de CTA",
  //   ],
  //   designSystem: {
  //     colors: [
  //       { name: "Cream", hex: "#F7F3ED" },
  //       { name: "Charcoal", hex: "#1A1A1A" },
  //       { name: "Accent", hex: "#C45C26" },
  //       { name: "Muted", hex: "#8A8A8A" },
  //     ],
  //     typography: [
  //       { role: "Títulos", font: "DM Serif Display" },
  //       { role: "Texto", font: "Manrope" },
  //     ],
  //   },
  //   development: [
  //     "Landing page performática em Next.js",
  //     "Seções modulares para cardápio e CTA",
  //     "Tipografia e contraste otimizados para leitura",
  //     "Responsividade mobile-first",
  //   ],
  //   results: [
  //     "Narrativa visual forte da marca",
  //     "Fluxo de pedido mais direto",
  //     "Layout pronto para campanhas e variações sazonais",
  //   ],
  // },
  {
    id: "compresskly",
    category: "Web App",
    disciplines: "PRODUCT • FULL STACK • SAAS",
    title: "CompressKly",
    href: "https://github.com/nathalyadev/compresskly",
    tagline: "Comprima vídeos e imagens sem perder qualidade nem tempo.",
    description:
      "Aplicação full stack em monorepo para enviar, comprimir e baixar MP4 e imagens (JPEG, PNG, WebP, AVIF), com perfis de qualidade, progresso em tempo real e download do arquivo otimizado.",
    about: [
      "O desafio foi transformar compressão de mídia — tarefa técnica e opaca — em um fluxo guiado: upload, escolha de qualidade, acompanhamento do processamento e resultado claro para download.",
      "O front prioriza feedback em cada etapa (validação, polling de status, preview e erros acessíveis); a API orquestra FFmpeg com armazenamento local e metadados persistidos, sem depender de SaaS externos para o núcleo do produto.",
    ],
    tags: [
      "React 19",
      "Next.js 16",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "ASP.NET Core",
      "FFmpeg",
      "UI/UX",
    ],
    image: "/images/projects/compresskly/screenshot-1.webp",
    gallery: [
      "/images/projects/compresskly/screenshot-1.webp",
      "/images/projects/compresskly/screenshot-2.png",
    ],
    date: "2025-11-01",
    meta: {
      client: "Projeto pessoal",
      duration: "Em desenvolvimento",
      team: "1 desenvolvedora",
      platform: "Web",
      technologies: [
        "Next.js 16",
        "React 19",
        "TypeScript",
        "Tailwind CSS 4",
        "shadcn/ui",
        "ASP.NET Core (.NET 10)",
        "Entity Framework Core",
        "SQLite",
        "FFmpeg / FFmpeg.AutoGen",
        "FluentValidation",
      ],
    },
    uxCases: [
      "Home com CTA e proposta de valor",
      "Navegação por sidebar (vídeos e imagens)",
      "Fluxo de upload com validação de formato e tamanho",
      "Seletor de qualidade (high, balanced, max)",
      "Painel de progresso com polling de status",
      "Preview e card de resultado com download",
      "Estados de erro e páginas 404 / erro global",
    ],
    designSystem: {
      colors: [
        { name: "Cream (Background)", hex: "#F7F3ED" },
        { name: "Deep Petrol (Sidebar)", hex: "#0B3B45" },
        { name: "Petrol (Primary)", hex: "#28545A" },
        { name: "Ink", hex: "#181818" },
        { name: "Gray Text", hex: "#5C5C5C" },
        { name: "Beige (Border)", hex: "#DCD5CC" },
        { name: "Surface", hex: "#FFFFFF" },
      ],
      typography: [
        { role: "Títulos", font: "DM Serif Display" },
        { role: "Corpo e interface", font: "Manrope" },
      ],
    },
    development: [
      "Monorepo com front Next.js (App Router) e API ASP.NET Core",
      "Clean Architecture na API (Api, Application, Core, Infrastructure)",
      "Compressão assíncrona de vídeo com perfis configuráveis e FFmpeg LGPL (libopenh264)",
      "Endpoint de compressão/conversão de imagens com limites de tamanho e megapixels",
      "Cliente HTTP tipado, serviços por caso de uso e validação no client",
      "UI com shadcn/ui, AppShell, componentes de upload, progresso e resultado",
      "Swagger/OpenAPI, middleware de erros e testes unitários e de integração",
    ],
    results: [
      "Fluxo ponta a ponta de compressão de vídeo e imagem em uma única experiência",
      "Interface consistente com design system petrol/cream e componentes reutilizáveis",
      "Backend desacoplado da UI, pronto para evoluir storage e filas sem retrabalho no front",
      "Documentação e READMEs por camada facilitando onboarding e portfólio técnico",
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
