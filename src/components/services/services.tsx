import { Container } from "@/components/Container";
import { SERVICES } from "@/data/services";
import { ServiceCard } from "./ServiceCard";
import { cn } from "cn";
import { Title } from "../layout/Title";

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

        <section className="flex gap-12 flex-col sm:flex-row">
          <Title
            id="servicos-heading"
            className={cn("w-full flex-1 whitespace-nowrap")}
          >
            O que eu faço
          </Title>
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
