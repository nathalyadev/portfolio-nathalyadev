import { Button } from "@/components/layout/Button";
import { Container } from "@/components/Container";
import { FAQ_ITEMS } from "@/data/faq";
import { FaqList } from "./FaqList";
import { cn } from "cn";

export function Faq() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="bg-cream py-16 sm:py-18 lg:py-16"
    >
      <Container>
        <div
          className={cn(
            "flex justify-between items-center gap-3 items-left mb-4",
          )}
        >
          <span className="text-xs font-semibold tracking-[0.18em] text-petrol-blue uppercase">
            FAQ
          </span>
        </div>

        <section className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start lg:gap-16">
          <div className="flex flex-col">
            <h2
              id="servicos-heading"
              className="w-full whitespace-nowrap font-dm-serif-display font-medium text-2xl leading-tight text-black sm:text-4xl lg:text-3xl"
            >
              Perguntas Frequentes
            </h2>
            <p className="mt-5 text-base leading-relaxed text-gray">
              Algumas respostas rápidas para entender melhor o processo e o que
              esperar da parceria.
            </p>
          </div>

          <FaqList items={FAQ_ITEMS} />
        </section>
      </Container>

      <Container className="mt-14 flex flex-col items-center gap-4 text-center">
        <div className="flex flex-col items-center gap-1">
          <p className="max-w-md text-sm text-petrol-blue font-semibold sm:text-lg">
            Ainda tem alguma dúvida?
          </p>
          <span className="text-base leading-relaxed text-gray">Conte-me sobre seu projeto.</span>
        </div>

        <Button href="/#contato" variant="outline" showArrow>
          Vamos começar
        </Button>
      </Container>
    </section>
  );
}
