import { Container } from "@/components/shared/Container";
import { SERVICES } from "@/data/services";
import { ServiceCard } from "./ServiceCard";
import { cn } from "cn";

export function Services() {
  return (
    <section
      id="servicos"
      aria-labelledby="servicos-heading"
      className="bg-cream py-16 sm:py-20 lg:py-24"
    >
      <Container>
        <div className={cn("flex max-w-2xl flex-col gap-3 items-left mb-4")}>
          <span className="text-xs font-semibold tracking-[0.18em] text-petrol-blue uppercase">
            Serviços
          </span>
        </div>

        <section className="flex gap-12">
          <h2
            id="servicos-heading"
            className="w-full flex-1 whitespace-nowrap font-dm-serif-display font-medium text-3xl leading-tight text-black sm:text-4xl lg:text-[2.75rem]"
          >
            O que eu faço
          </h2>
          <div className="grid gap-0 sm:grid-cols-2 sm:gap-2 lg:grid-cols-4">
            {SERVICES.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </section>
      </Container>
    </section>
  );
}
