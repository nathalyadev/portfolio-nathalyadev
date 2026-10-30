import { Suspense } from "react";
import { Container } from "@/components/Container";
import { SectionLabel } from "@/components/layout/SectionLabel";
import { ProjectsPageClient } from "@/components/projects/ProjectsPageClient";
import { PROJECTS } from "@/data/projects";
import { getAllProjects } from "@/lib/projects-local-store";
import { ProjectsJsonLd } from "@/components/JsonLd/Projects";
import Image from "next/image";

function ProjectsGridFallback() {
  return (
    <div className="flex flex-col gap-10" aria-hidden>
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="h-10 w-24 rounded-full bg-secondary" />
        ))}
      </div>
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-14">
        {PROJECTS.map((project) => (
          <div key={project.id} className="flex flex-col">
            <div className="aspect-16/11 w-full rounded-xl bg-secondary" />
            <div className="mt-4 h-3 w-24 rounded bg-secondary" />
            <div className="mt-3 h-7 w-2/3 rounded bg-secondary" />
            <div className="mt-3 h-16 w-full rounded bg-secondary" />
          </div>
        ))}
      </div>
    </div>
  );
}

export async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <section
      aria-labelledby="projetos-page-heading"
      className="bg-cream py-16 sm:py-20 lg:py-24"
    >
      <ProjectsJsonLd projects={projects} />

      <Container>
        <header className="flex justify-between">
          <div className="w-full flex flex-col">
            <SectionLabel>Meus Projetos</SectionLabel>
            <h1
              id="projetos-page-heading"
              className="mt-3 font-dm-serif-display text-3xl leading-tight text-black sm:text-4xl lg:text-5xl"
            >
              Alguns dos projetos que <br />
              já{" "}
              <span className="text-petrol-blue">desenvolvi.</span>
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-gray sm:text-lg">
              Aqui você encontra uma seleção de projetos que refletem minha
              experiência em criar soluções digitais funcionais, modernas e com
              foco na melhor experiência do usuário.
            </p>
          </div>

          <div className="w-full">
            <Image
              src="/images/projects/thumbnail.png"
              alt=""
              width={600}
              height={400}
            />
          </div>
        </header>

        <div className="mt-12 lg:mt-16">
          <Suspense fallback={<ProjectsGridFallback />}>
            <ProjectsPageClient projects={projects} />
          </Suspense>
        </div>
      </Container>
    </section>
  );
}
