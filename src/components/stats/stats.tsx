import { Container } from "@/components/Container";
import { STATS } from "@/data/stats";
import { StatItem } from "./StatItem";

export function Stats() {
  return (
    <section aria-label="Indicadores" className="bg-light-gray py-8 sm:py-8">
      <Container className="grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-6">
        {STATS.map((stat, index) =>
          index === STATS.length - 1 ? (
            <div key={stat.id} className={"text-center"}>
              <div className="rotate-[-6.19deg] text-lg font-dm-serif-display italic text-petrol-blue">
                <span className="block">Tecnologia e Design</span>
                <span className="block">os Melhores resultados</span>
              </div>
            </div>
          ) : (
            <StatItem key={stat.id} stat={stat} />
          ),
        )}
      </Container>
    </section>
  );
}
