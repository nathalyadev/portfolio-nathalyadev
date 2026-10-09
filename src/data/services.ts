export type Service = {
  id: string;
  number: string;
  title: string;
  description: string;
};

export const SERVICES: Service[] = [
  {
    id: "frontend",
    number: "01",
    title: "Desenvolvimento Front-end",
    description:
      "React, Next.js e TypeScript para produtos digitais modernos e escaláveis.",
  },
  {
    id: "ecommerce",
    number: "02",
    title: "E-commerce",
    description:
      "Páginas de produto, checkout, integrações e performance.",
  },
  {
    id: "performance",
    number: "03",
    title: "Performance",
    description:
      "Core Web Vitals, renderização, carregamento, imagens e mais.",
  },
  {
    id: "ui-engineering",
    number: "04",
    title: "UI Engineering",
    description:
      "Transformação de layouts Figma em interfaces reais e responsivas",
  },
];
