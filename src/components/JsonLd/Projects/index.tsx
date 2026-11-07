import { Project } from "@/data/projects";
import { getSiteUrl } from "@/lib/site";

interface ProjectsJsonLdProps {
  projects: Project[];
}

export function ProjectsJsonLd({ projects }: ProjectsJsonLdProps) {
  const siteUrl = getSiteUrl();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${siteUrl}/projetos#collection`,
    name: "Projetos | Nathálya Souza",
    description:
      "Seleção de interfaces, landing pages e produtos digitais de Nathálya Souza.",
    url: `${siteUrl}/projetos`,
    inLanguage: "pt-BR",
    isPartOf: {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Nathálya Souza",
    },
    about: {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: "Nathálya Souza",
    },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: projects.length,
      itemListElement: projects.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "CreativeWork",
          name: project.title,
          description: project.description,
          url: `${siteUrl}/projetos?projeto=${project.id}`,
        },
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
