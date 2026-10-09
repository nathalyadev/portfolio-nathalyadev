import { ButtonLink } from "@/components/shared/ButtonLink";
import { Container } from "@/components/shared/Container";
import { ContactVisual } from "./ContactVisual";

export function Contact() {
  return (
    <section
      id="contato"
      aria-labelledby="contato-heading"
      className="bg-cream py-16 sm:py-20 lg:py-0"
    >
      <Container className="overflow-hidden rounded-3xl border border-beige lg:grid lg:max-w-7xl lg:grid-cols-2 lg:rounded-none lg:border-0 lg:px-0">
        <div className="flex flex-col justify-center px-6 py-10 sm:px-10 lg:px-12 lg:py-24">
          <span className="text-xs font-semibold tracking-[0.18em] text-petrol-blue uppercase">
            Contato
          </span>
          <h2
            id="contato-heading"
            className="mt-4 font-dm-serif-display text-3xl leading-tight text-black sm:text-4xl"
          >
            Vamos começar?
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-gray">
            Conte-me sobre seu projeto e vamos transformar sua ideia em uma
            experiência digital incrível.
          </p>
          <div className="mt-8">
            <ButtonLink href="mailto:contato@nathalyadev.com.br" showArrow>
              Solicitar orçamento
            </ButtonLink>
          </div>
        </div>

        <ContactVisual />
      </Container>
    </section>
  );
}
