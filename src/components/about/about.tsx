import { Container } from "@/components/shared/Container";
import { ABOUT_INFO } from "@/data/about";
import { AboutInfo } from "./AboutInfo";
import { AboutPortrait } from "./AboutPortrait";
import Image from "next/image";

export function About() {
  return (
    <section
      id="sobre"
      aria-labelledby="sobre-heading"
      className="bg-cream py-16 sm:py-20 lg:py-24"
    >
      <Container className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-12">
  
        <Image src="/portrait.png" alt="About" width={500} height={500} />

        <div>
          <span className="text-xs font-semibold tracking-[0.18em] text-petrol-blue uppercase">
            Sobre mim
          </span>
          <h2
            id="sobre-heading"
            className="mt-4 font-dm-serif-display text-3xl leading-tight text-black sm:text-4xl"
          >
            Transformo ideias em experiências digitais.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-gray">
            Com quase 4 anos de experiência, desenvolvo interfaces modernas e
            responsivas com React, Next.js e TypeScript — unindo design e
            engenharia para produtos digitais que performam de verdade.
          </p>
          <p className="mt-4 text-base leading-relaxed text-gray">
            Meu foco está em criar experiências claras, acessíveis e alinhadas
            ao negócio, do primeiro pixel à entrega final.
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
