import type { Metadata } from "next";

import { SiteJsonLd } from "@/components/JsonLd/Site";
import { SITE_DESCRIPTION, SITE_TITLE } from "@/lib/site";
import { HomePage } from "@/template/pages/home";

export const metadata: Metadata = {
  title: {
    absolute: SITE_TITLE,
  },
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <>
      <SiteJsonLd />
      <HomePage />
    </>
  );
}
