import { Container } from "@/components/Container";
import { ABOUT_INFO } from "@/data/about";
import { AboutInfo } from "./AboutInfo";
import Image from "next/image";
import { SectionLabel } from "../layout/SectionLabel";
import { Title } from "../layout/Title";

export function About() {
  return (
    <section
      id="sobre"
      aria-labelledby="sobre-heading"
      className="bg-cream py-16 sm:py-20 lg:py-24"
    >
      <Container className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-12">
        <Image
          src="/images/about/portrait.png"
          alt="Retrato profissional de Nathálya Souza"
          width={550}
          height={550}
        />

        <div>
          <SectionLabel>Sobre mim</SectionLabel>
          <Title id="sobre-heading">
            Transformo ideias em experiências digitais.
          </Title>
          
          <p className="mt-5 text-base leading-relaxed text-gray">
            Sou desenvolvedora Front-end cam quase 4 anos de experiência o
            desenvolvimento de aplicações web, atuando principalmente com React,
            Next.js e TypeScript.
          </p>
          <p className="mt-4 text-base leading-relaxed text-gray">
            Tenho experiência em e-commerce, sistemas administrativos e produtos
            digitais, com foco em interfaces responsivas. UUUX, integração com
            APIs, performance e Core Web Vital.
          </p>
        </div>

        <AboutInfo
          items={ABOUT_INFO}
          className="border-t border-beige pt-8 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8"
        />
      </Container>
    </section>
  );
}
