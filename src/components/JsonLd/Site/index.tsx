import { SOCIAL_LINKS } from "@/components/footer/SocialLinks";
import {
  getSiteUrl,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
} from "@/lib/site";

export function SiteJsonLd() {
  const siteUrl = getSiteUrl();
  const sameAs = SOCIAL_LINKS.map((link) => link.href);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: SITE_NAME,
        description: SITE_DESCRIPTION,
        inLanguage: "pt-BR",
        publisher: { "@id": `${siteUrl}/#person` },
      },
      {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        name: SITE_NAME,
        url: siteUrl,
        jobTitle: "Desenvolvedora Front-end e UI/UX Designer",
        description: SITE_DESCRIPTION,
        image: `${siteUrl}/images/about/portrait.webp`,
        sameAs,
        knowsAbout: [
          "React",
          "Next.js",
          "TypeScript",
          "UI Design",
          "Front-end Development",
          "E-commerce",
          "Web Performance",
        ],
      },
      {
        "@type": "ProfilePage",
        "@id": `${siteUrl}/#profilepage`,
        url: siteUrl,
        name: SITE_TITLE,
        description: SITE_DESCRIPTION,
        inLanguage: "pt-BR",
        isPartOf: { "@id": `${siteUrl}/#website` },
        about: { "@id": `${siteUrl}/#person` },
        mainEntity: { "@id": `${siteUrl}/#person` },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
