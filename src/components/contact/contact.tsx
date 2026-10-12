import NextImage from "next/image";

import { Button } from "@/components/layout/Button";
import { Container } from "@/components/Container";
import { Title } from "../layout/Title";
import { SectionLabel } from "../layout/SectionLabel";
import { cn } from "cn";

export function Contact() {
  return (
    <section
      id="contato"
      aria-labelledby="contato-heading"
      className="bg-cream py-16 sm:py-20 lg:py-0"
    >
      <Container className="overflow-hidden rounded-3xl flex flex-col gap-8 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:rounded-none">
        <div
          className={cn(
            "flex-1 flex h-full flex-col justify-start",
            "pr-4",
            "border-b border-beige lg:border-b-0 lg:border-r",
          )}
        >
          <SectionLabel>Contato</SectionLabel>

          <Title id="contato-heading">Vamos começar?</Title>

          <p className="mt-5 text-base leading-relaxed text-gray">
            Conte-me sobre seu projeto e vamos transformar sua ideia em uma
            experiência digital incrível.
          </p>
          <div className="mt-8">
            <Button
              href="mailto:ns.contato21@gmail.com"
              variant="outline"
              showArrow
            >
              Solicitar orçamento
            </Button>
          </div>
        </div>

        <NextImage
          src="/images/contact/contact.png"
          alt="Contact"
          width={550}
          height={550}
          className="h-full w-full"
        />
      </Container>
    </section>
  );
}
