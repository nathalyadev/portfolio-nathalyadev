import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Inlines CSS no HTML e remove o <link> render-blocking (bom para Tailwind e primeiras visitas)
    inlineCss: true,
  },
};

export default nextConfig;
