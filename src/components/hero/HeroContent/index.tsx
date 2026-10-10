import { Button } from "@/components/layout/Button";

export function HeroContent() {
  return (
    <div className="relative z-10 flex max-w-xl flex-col items-start">
      <span className="text-xs font-semibold tracking-[0.18em] text-petrol-blue uppercase">
        Front-end Developer
      </span>

      <h1
        id="hero-heading"
        className="mt-4 font-dm-serif-display text-4xl leading-[1.15] text-black sm:text-5xl lg:text-[3.25rem]"
      >
        Desenvolvimento de produtos digitais de{" "}
        <em className="font-dm-serif-display italic text-petrol-blue">
          alta performance
        </em>
      </h1>

      <p className="mt-5 max-w-md text-base leading-relaxed text-gray sm:text-lg">
        Crio interfaces modernas, responsivas e focadas em resultado, com React,
        Next.js e TypeScript.
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
  );
}
