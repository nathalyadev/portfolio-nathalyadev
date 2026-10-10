import NextImage from "next/image";

import { Button } from "@/components/layout/Button";
import { Container } from "@/components/Container";
import { Title } from "../layout/Title";
import { SectionLabel } from "../layout/SectionLabel";

export function Contact() {
  return (
    <section
      id="contato"
      aria-labelledby="contato-heading"
      className="bg-cream py-16 sm:py-20 lg:py-0"
    >
      <Container className="overflow-hidden rounded-3xl border border-beige lg:grid lg:max-w-7xl lg:grid-cols-2 lg:rounded-none lg:border-0 lg:px-0">
        <div className="flex flex-col justify-center px-6 py-10 sm:px-10 lg:px-12 lg:py-24">
          <SectionLabel>Contato</SectionLabel>
          
          <Title id="contato-heading">Vamos começar?</Title>

          <p className="mt-5 text-base leading-relaxed text-gray">
            Conte-me sobre seu projeto e vamos transformar sua ideia em uma
            experiência digital incrível.
          </p>
          <div className="mt-8">
            <Button href="mailto:ns.contato21@gmail.com"variant="outline" showArrow>
              Solicitar orçamento
            </Button>
          </div>
        </div>

        <NextImage
          src="/images/contact/contact.png"
          alt="Contact"
          width={550}
          height={550}
          className="h-full"
        />
      </Container>
    </section>
  );
}
