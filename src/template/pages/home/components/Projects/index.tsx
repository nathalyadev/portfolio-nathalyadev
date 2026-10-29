import { Button } from "@/components/layout/Button";
import { Container } from "@/components/Container";
import { cn } from "cn";
import { SectionLabel } from "@/components/layout/SectionLabel";
import { ProjectCard } from "./ProjectCard";
import { PROJECTS } from "@/data/projects";

export function ProjectsComponent() {
  return (
    <section
      id="projetos"
      aria-labelledby="projetos-heading"
      className="bg-cream py-16 sm:py-20 lg:py-24"
    >
      <Container className="flex flex-col items-start gap-10">
        <div
          className={cn(
            "flex w-full flex-wrap items-center justify-between gap-3",
          )}
        >
          <SectionLabel>Projetos</SectionLabel>

          <Button href="/projetos" variant="outline" showArrow>
            Ver todos os projetos
          </Button>
        </div>

        <section className="flex gap-12 flex-wrap">
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
