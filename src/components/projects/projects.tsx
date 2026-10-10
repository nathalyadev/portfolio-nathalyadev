import { Button } from "@/components/layout/Button";
import { Container } from "@/components/Container";
import { PROJECTS } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";
import { cn } from "cn";

export function Projects() {
  return (
    <section
      id="projetos"
      aria-labelledby="projetos-heading"
      className="border-y border-beige/60 bg-cream py-16 sm:py-20 lg:py-24"
    >
      <Container>
        <div
          className={cn(
            "flex justify-between items-center gap-3 items-left mb-4",
          )}
        >
          <span className="text-xs font-semibold tracking-[0.18em] text-petrol-blue uppercase">
            Projetos
          </span>

          <Button href="/#projetos" variant="outline" showArrow>
            Ver todos os projetos
          </Button>
        </div>

        <section className="flex gap-12">
          <h2
            id="servicos-heading"
            className="w-full flex-1 whitespace-nowrap font-dm-serif-display font-medium text-2xl leading-tight text-black sm:text-4xl lg:text-3xl"
          >
            Projetos selecionados
          </h2>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-2">
            {PROJECTS.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>
      </Container>
    </section>
  );
}
