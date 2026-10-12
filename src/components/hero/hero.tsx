import { Container } from "@/components/Container";
import { cn } from "cn";
import { Button } from "../layout/Button";
import Image from "next/image";

export function Hero() {
  return (
    <Container
      as="section"
      id="inicio"
      aria-labelledby="hero-heading"
      className="relative border-b border-beige/60 bg-cream py-14 sm:py-20 lg:overflow-visible lg:py-24"
    >
      <div className="relative z-10 flex max-w-xl flex-col items-start py-8">
        <span className="text-xs font-semibold tracking-[0.18em] text-petrol-blue uppercase">
          Front-end Developer
        </span>

        <h1
          id="hero-heading"
          className={cn(
            "mt-4 font-dm-serif-display text-4xl leading-[1.15] text-black",
            "sm:text-5xl lg:text-[3.25rem]",
          )}
        >
          Desenvolvimento de produtos digitais de{" "}
          <em className="font-dm-serif-display italic text-petrol-blue">
            alta performance
          </em>
        </h1>

        <p className="mt-5 max-w-md text-base leading-relaxed text-gray sm:text-lg">
          Crio interfaces modernas, responsivas e focadas em resultado, com
          React, Next.js e TypeScript.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/#projetos" showArrow>
            Ver projetos
          </Button>

          <Button href="/#contato" variant="outline">
            Solicitar orçamento
          </Button>
        </div>
      </div>

      <div
        className={cn(
          "relative z-1 mx-auto h-[320px] lg:absolute ",
          "w-full max-w-lg lg:w-[62%]",
          "lg:inset-y-0 lg:right-0 lg:my-auto lg:h-[600px] lg:max-w-none",
        )}
      >
        <Image
          src="/images/hero/hero-visual.svg"
          alt="Mockup de notebook e tablet com interface de projeto digital"
          fill
          priority
          className="object-fill object-right"
          sizes="(max-width: 1024px) 90vw, 58vw"
        />
      </div>
    </Container>
  );
}
