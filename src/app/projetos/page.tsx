import type { Metadata } from "next";

import { SITE_NAME, SITE_OG_IMAGE } from "@/lib/site";
import { ProjectsPage } from "@/template/pages/projects";

const pageTitle = "Projetos";
const pageDescription =
  "Conheça os projetos de Nathálya Souza: landing pages, web apps e interfaces com React, Next.js, TypeScript e UI/UX Design.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  keywords: [
    "projetos front-end",
    "portfólio",
    "React",
    "Next.js",
    "TypeScript",
    "UI/UX Design",
    "Nathálya Souza",
  ],
  alternates: {
    canonical: "/projetos",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/projetos",
    siteName: SITE_NAME,
    title: `${pageTitle} | ${SITE_NAME} — Front-end e UI/UX Design`,
    description:
      "Landing pages, web apps e interfaces desenvolvidas com React, Next.js e TypeScript.",
    images: [
      {
        url: SITE_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: `Projetos de ${SITE_NAME} — Front-end e UI/UX Design`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${pageTitle} | ${SITE_NAME}`,
    description:
      "Landing pages, web apps e interfaces desenvolvidas com React, Next.js e TypeScript.",
    images: [SITE_OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Projetos() {
  return <ProjectsPage />;
}
