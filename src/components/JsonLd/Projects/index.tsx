import { Project } from "@/data/projects";

interface ProjectsJsonLdProps {
  projects: Project[];
}

export function ProjectsJsonLd({ projects }: ProjectsJsonLdProps) {
  const siteUrl = process.env.SITE_URL ?? "";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Projetos | Nathálya Souza",
    description:
      "Seleção de interfaces, landing pages e produtos digitais de Nathálya Souza.",
    url: `${siteUrl}/projetos`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: projects.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: project.title,
        description: project.description,
        url: `${siteUrl}/projetos?projeto=${project.id}`,
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
