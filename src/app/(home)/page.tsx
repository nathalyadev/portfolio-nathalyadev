import { Metadata } from "next";
import { About } from "@/components/about/about";
import { Contact } from "@/components/contact/contact";
import { Faq } from "@/components/faq/faq";
import { Hero } from "@/components/hero/hero";
import { Projects } from "@/components/projects/projects";
import { Services } from "@/components/services/services";
import { Stats } from "@/components/stats/stats";

export const metadata: Metadata = {
  title: "Nathálya | Front-end & UI Designer",
  description:
    "Desenvolvedora Front-end & UI Designer, com quase 4 anos de experiência em design e desenvolvimento de interfaces web.",
  keywords: [
    "Nathálya",
    "Front-end",
    "UI Designer",
    "Desenvolvedora",
    "Developer",
    "Designer",
  ],
  authors: [
    {
      name: "Nathálya Souza",
      url: "https://nathalyadev.com.br",
    },
  ],
  openGraph: {
    title: "Nathálya | Front-end & UI Designer",
    description:
      "Desenvolvedora Front-end & UI Designer, com quase 4 anos de experiência em design e desenvolvimento de interfaces web.",
    url: "https://nathalyadev.com.br",
    siteName: "Nathálya",
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Projects />
      <About />
      <Contact />
      <Faq />
      <Stats />
    </>
  );
}
