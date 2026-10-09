import { ButtonLink } from "@/components/shared/ButtonLink";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { FAQ_ITEMS } from "@/data/faq";
import { FaqList } from "./FaqList";

export function Faq() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="bg-cream py-16 sm:py-20 lg:py-24"
    >
      <Container className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start lg:gap-16">
        <SectionHeading
          label="FAQ"
          title="Perguntas Frequentes"
          titleId="faq-heading"
          description="Algumas respostas rápidas para entender melhor o processo e o que esperar da parceria."
        />

        <FaqList items={FAQ_ITEMS} />
      </Container>

      <Container className="mt-14 flex flex-col items-center gap-4 text-center">
        <p className="max-w-md text-sm text-gray sm:text-base">
          Ainda tem alguma dúvida? Conte-me sobre seu projeto.
        </p>
        <ButtonLink href="/#contato" showArrow>
          Vamos começar
        </ButtonLink>
      </Container>
    </section>
  );
}
