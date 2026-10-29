import { Suspense } from "react";
import { Container } from "@/components/Container";
import { SectionLabel } from "@/components/layout/SectionLabel";
import { ProjectsPageClient } from "@/components/projects/ProjectsPageClient";
import { PROJECTS } from "@/data/projects";
import { ProjectsJsonLd } from "@/components/JsonLd/Projects";

function ProjectsGridFallback() {
  return (
    <div
      className="grid gap-10 sm:grid-cols-2 lg:gap-x-8 lg:gap-y-14"
      aria-hidden
    >
      {PROJECTS.map((project) => (
        <div key={project.id} className="flex flex-col">
          <div className="aspect-16/11 w-full rounded-xl bg-secondary" />
          <div className="mt-4 h-3 w-24 rounded bg-secondary" />
          <div className="mt-3 h-7 w-2/3 rounded bg-secondary" />
          <div className="mt-3 h-16 w-full rounded bg-secondary" />
        </div>
      ))}
    </div>
  );
}

export function ProjectsPage() {
  return (
    <section
      aria-labelledby="projetos-page-heading"
      className="bg-cream py-16 sm:py-20 lg:py-24"
    >
      <ProjectsJsonLd projects={PROJECTS} />

      <Container>
        <header className="max-w-3xl">
          <SectionLabel>Projetos</SectionLabel>
          <h1
            id="projetos-page-heading"
            className="mt-3 font-dm-serif-display text-3xl leading-tight text-black sm:text-4xl lg:text-5xl"
          >
            Conheça meus projetos
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-gray sm:text-lg">
            Seleção de interfaces, landing pages e produtos digitais
            desenvolvidos com foco em experiência, performance e design
            responsivo.
          </p>
        </header>

        <div className="mt-12 lg:mt-16">
          <Suspense fallback={<ProjectsGridFallback />}>
            <ProjectsPageClient />
          </Suspense>
        </div>
      </Container>
    </section>
  );
}
