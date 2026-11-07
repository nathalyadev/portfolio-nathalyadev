export const SITE_NAME = "Nathálya Souza";
export const SITE_TITLE =
  "Nathálya Souza | Desenvolvedora Front-end e UI/UX Designer";
export const SITE_DESCRIPTION =
  "Desenvolvedora Front-end com experiência em React, Next.js, TypeScript e UI/UX Design. Explore projetos de interfaces web, e-commerce e performance.";
export const SITE_OG_IMAGE = "/images/og/portfolio.png";

/** URL canônica do site (produção). Usada como fallback quando SITE_URL não está definida. */
export const DEFAULT_SITE_URL = "https://nathalyadev.vercel.app";

export function getSiteUrl(): string {
  const fromEnv = process.env.SITE_URL?.replace(/\/$/, "");
  return fromEnv || DEFAULT_SITE_URL;
}
