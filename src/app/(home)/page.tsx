import type { Metadata } from "next";

import { HomePage } from "@/template/pages/home";

const siteUrl = process.env.SITE_URL

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: "Nathálya Souza | Desenvolvedora Front-end e UI Designer",

  description:
    "Desenvolvedora Front-end com experiência em React, Next.js, TypeScript e UI Design. Explore projetos de interfaces web, e-commerce e performance.",

  authors: [
    {
      name: "Nathálya Souza",
      url: siteUrl,
    },
  ],

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: "Nathálya Souza",
    title: "Nathálya Souza | Desenvolvedora Front-end e UI Designer",
    description:
      "Projetos de desenvolvimento front-end, interfaces web, e-commerce e performance com React, Next.js e TypeScript.",
    images: [
      {
        url: "/images/og/portfolio.png",
        width: 1200,
        height: 630,
        alt: "Portfólio de Nathálya Souza — Front-end e UI Design",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Nathálya Souza | Desenvolvedora Front-end e UI Designer",
    description:
      "Projetos de desenvolvimento front-end, interfaces web, e-commerce e performance.",
    images: ["/images/og/portfolio.png"],
  },
};

export default function Home() {
  return <HomePage />;
}
