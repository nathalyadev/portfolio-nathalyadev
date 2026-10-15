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
    category: "Landing Page",
    title: "Institucional",
    description:
      "Site institucional limpo e responsivo, com estrutura clara para gerar contato.",
    tags: ["React", "Next.js", "TypeScript"],
    image: "/images/projects/no-project.svg",
  },
];
