import { Container } from "@/components/shared/Container";
import { STATS } from "@/data/stats";
import { StatItem } from "./StatItem";

export function Stats() {
  return (
    <section
      aria-label="Indicadores"
      className="border-y border-beige bg-secondary/70 py-10 sm:py-12"
    >
      <Container className="grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-6">
        {STATS.map((stat) => (
          <StatItem key={stat.id} stat={stat} />
        ))}
      </Container>
    </section>
  );
}
