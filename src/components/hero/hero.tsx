import { Container } from "@/components/Container";
import { HeroContent } from "./HeroContent";
import { HeroVisual } from "./HeroVisual";

export function Hero() {
  return (
    <section
      id="inicio"
      aria-labelledby="hero-heading"
      className="relative border-b border-beige/60 bg-cream py-14 sm:py-20 lg:overflow-visible lg:py-24"
    >
      <Container className="relative grid items-center gap-12 lg:min-h-[530px] lg:grid-cols-2 lg:gap-16">
        <HeroContent />
        <HeroVisual />
      </Container>
    </section>
  );
}
