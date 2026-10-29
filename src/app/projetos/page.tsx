import type { Metadata } from "next";

import { ProjectsPage } from "@/template/pages/projects";

const siteUrl = process.env.SITE_URL;

export const metadata: Metadata = {
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,

  title: "Projetos | Nathálya Souza — Front-end e UI/UX Design",

  description:
    "Conheça os projetos de Nathálya Souza: landing pages, web apps e interfaces com React, Next.js, TypeScript e UI Design.",

  alternates: {
    canonical: "/projetos",
  },

  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/projetos",
    siteName: "Nathálya Souza",
    title: "Projetos | Nathálya Souza — Front-end e UI/UX Design",
    description:
      "Landing pages, web apps e interfaces desenvolvidas com React, Next.js e TypeScript.",
    images: [
      {
        url: "/images/og/portfolio.png",
        width: 1200,
        height: 630,
        alt: "Projetos de Nathálya Souza — Front-end e UI/UX Design",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Projetos | Nathálya Souza — Front-end e UI/UX Design",
    description:
      "Landing pages, web apps e interfaces desenvolvidas com React, Next.js e TypeScript.",
    images: ["/images/og/portfolio.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function Projetos() {
  return <ProjectsPage />;
}
