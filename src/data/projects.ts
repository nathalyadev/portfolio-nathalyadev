export type Project = {
  id: string;
  category: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  href?: string;
};

export const PROJECTS: Project[] = [
  {
    id: "nfb",
    category: "Landing Page",
    title: "NFB — Natural Beauty",
    description:
      "Landing page para marca de cuidados naturais, com foco em conversão e experiência visual.",
    tags: ["React", "Next.js", "Tailwind"],
    image: "/images/projects/nfb.webp",
  },
  {
    id: "mypizza",
    category: "Landing Page",
    title: "MyPizza",
    description:
      "Landing page para pizzaria artesanal, com cardápio visual e chamada para pedido.",
    tags: ["React", "Next.js", "Tailwind"],
    image: "/images/projects/mypizza.webp",
  },
  {
    id: "institucional",
    category: "Web App",
    title: "Compresskly",
    description:
      "Uma ferramenta web para comprimir imagens e vídeos de forma prática e eficiente, reduzindo o tamanho dos arquivos sem comprometer significativamente sua qualidade.",
    tags: ["React", "Next.js", "TypeScript", "UI/UX", "C#"],
    image: "/images/projects/compresskly.webp",
  },
];
