"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FaGithub, FaLinkedinIn, FaLink } from "react-icons/fa6";
import {
  HiArrowUpRight,
  HiOutlineCalendarDays,
  HiOutlineComputerDesktop,
  HiOutlineUser,
  HiOutlineUsers,
  HiOutlineWrenchScrewdriver,
  HiXMark,
} from "react-icons/hi2";
import type { Project } from "@/data/projects";
import { SOCIAL_LINKS } from "@/components/footer/SocialLinks";
import { cn } from "@/lib/utils";

const SECTIONS = [
  { id: "visao-geral", label: "Visão geral" },
  { id: "casos-ux", label: "Casos de UX" },
  { id: "design-system", label: "Design System" },
  { id: "desenvolvimento", label: "Desenvolvimento" },
  { id: "resultados", label: "Resultados" },
] as const;

type SectionId = (typeof SECTIONS)[number]["id"];

const META_ICONS = {
  client: HiOutlineUser,
  duration: HiOutlineCalendarDays,
  team: HiOutlineUsers,
  platform: HiOutlineComputerDesktop,
  technologies: HiOutlineWrenchScrewdriver,
} as const;

function shareOnLinkedIn(url: string) {
  const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
  window.open(shareUrl, "_blank", "noopener,noreferrer");
}

export function ProjectDetailModal({
  project,
  open,
  onOpenChange,
}: {
  project: Project | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const titleId = useId();
  const contentRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [activeSection, setActiveSection] = useState<SectionId>("visao-geral");
  const [copied, setCopied] = useState(false);
  const [cachedProject, setCachedProject] = useState<Project | null>(project);

  if (project && project.id !== cachedProject?.id) {
    setCachedProject(project);
    setActiveSection("visao-geral");
    setCopied(false);
  }

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onOpenChange(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onOpenChange]);

  useEffect(() => {
    if (!open || !cachedProject) return;

    const container = contentRef.current;
    if (!container) return;

    const nodes = SECTIONS.map((section) =>
      container.querySelector<HTMLElement>(`#modal-${section.id}`),
    ).filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          const id = visible.target.id.replace("modal-", "") as SectionId;
          setActiveSection(id);
        }
      },
      {
        root: container,
        threshold: [0.25, 0.5],
        rootMargin: "-10% 0px -55% 0px",
      },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [open, cachedProject]);

  if (typeof document === "undefined" || !cachedProject || !open) {
    return null;
  }

  const liveUrl = cachedProject.href;
  const pageUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/projetos?projeto=${cachedProject.id}`
      : `/projetos?projeto=${cachedProject.id}`;

  const linkedIn = SOCIAL_LINKS.find((item) => item.label === "LinkedIn");
  const github = SOCIAL_LINKS.find((item) => item.label === "GitHub");

  const scrollToSection = (id: SectionId) => {
    const container = contentRef.current;
    const target = container?.querySelector<HTMLElement>(`#modal-${id}`);
    if (!container || !target) return;

    container.scrollTo({
      top: target.offsetTop - 24,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
    setActiveSection(id);
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(pageUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const metaItems = [
    {
      key: "client" as const,
      label: "Cliente",
      value: cachedProject.meta.client,
    },
    {
      key: "duration" as const,
      label: "Duração",
      value: cachedProject.meta.duration,
    },
    { key: "team" as const, label: "Equipe", value: cachedProject.meta.team },
    {
      key: "platform" as const,
      label: "Plataforma",
      value: cachedProject.meta.platform,
    },
    {
      key: "technologies" as const,
      label: "Tecnologias",
      value: cachedProject.meta.technologies.join(", "),
    },
  ];

  return createPortal(
    <div className="fixed inset-0 z-100 flex items-start justify-center p-3 sm:items-center sm:p-6">
      <button
        type="button"
        className="absolute inset-0 bg-black/40 supports-backdrop-filter:backdrop-blur-xs"
        aria-label="Fechar detalhes do projeto"
        onClick={() => onOpenChange(false)}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-10 flex h-[min(92dvh,900px)] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-cream text-black shadow-2xl lg:max-w-7xl"
      >
        <div className="flex min-h-0 flex-1 flex-col md:flex-row">
          <aside className="pt-20 flex shrink-0 flex-col justify-between bg-[#0A2D37] text-cream md:w-56 lg:w-50">
            <nav
              aria-label="Seções do projeto"
              className="flex flex-row gap-2 overflow-x-auto md:flex-col md:gap-1 md:overflow-visible"
            >
              {SECTIONS.map((section, index) => {
                const isActive = activeSection === section.id;

                return (
                  <button
                    key={section.id}
                    type="button"
                    onClick={() => scrollToSection(section.id)}
                    className={cn(
                      "cursor-pointer flex shrink-0 items-center gap-3 px-3 py-2.5 text-left text-sm transition-colors",
                      isActive
                        ? "bg-cream/15 text-cream"
                        : "text-cream/70 hover:bg-cream/10 hover:text-cream",
                    )}
                    aria-current={isActive ? "true" : undefined}
                  >
                    <span className="font-medium tabular-nums opacity-70">
                      {String(index + 1).padStart(2, "0")}.
                    </span>
                    <span className="whitespace-nowrap">{section.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* <div className="px-4 py-6 lg:px-4 mt-6 hidden border-t border-cream/15 pt-5 md:flex flex-col items-center justify-center">
              {liveUrl ? (
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-cream transition-opacity hover:opacity-80"
                >
                  Ver projeto ao vivo
                  <HiArrowUpRight className="size-4" aria-hidden />
                </a>
              ) : null}

              <p className="mt-5 text-xs font-medium tracking-[0.14em] text-cream/55 uppercase">
                Compartilhar
              </p>
              <div className="mt-3 flex items-center gap-3">
                {linkedIn ? (
                  <button
                    type="button"
                    aria-label="Compartilhar no LinkedIn"
                    className="cursor-pointer flex size-8 items-center justify-center rounded-full text-cream/80 transition-colors hover:bg-cream/10 hover:text-cream"
                    onClick={() => shareOnLinkedIn(pageUrl)}
                  >
                    <FaLinkedinIn className="size-3.5" aria-hidden />
                  </button>
                ) : null}
                <button
                  type="button"
                  aria-label={copied ? "Link copiado" : "Copiar link"}
                  className="cursor-pointer flex size-8 items-center justify-center rounded-full text-cream/80 transition-colors hover:bg-cream/10 hover:text-cream"
                  onClick={copyLink}
                >
                  <FaLink className="size-3.5" aria-hidden />
                </button>
              </div>
              {copied ? (
                <p className="mt-2 text-xs text-cream/70" role="status">
                  Link copiado
                </p>
              ) : null}
            </div> */}
          </aside>

          <div className="relative flex min-h-0 min-w-0 flex-1 flex-col bg-[#f3f1ee]">
            <button
              ref={closeButtonRef}
              type="button"
              className="cursor-pointer absolute top-3 right-3 z-10 flex size-10 items-center justify-center rounded-full text-black transition-colors hover:bg-black/5"
              aria-label="Fechar detalhes do projeto"
              onClick={() => onOpenChange(false)}
            >
              <HiXMark className="size-5" aria-hidden />
            </button>

            <div
              ref={contentRef}
              className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-6 sm:px-8 sm:py-8 lg:px-8"
            >
              <section
                id="modal-visao-geral"
                aria-labelledby="modal-visao-geral-heading"
                className="scroll-mt-6 grid grid-cols-1 gap-6 md:grid-cols-2"
              >
                <div className="w-full overflow-hidden rounded-xl flex flex-col gap-8">
                  <div className="flex flex-col gap-2">
                    <div className="relative aspect-16/10 w-full">
                      <Image
                        src={cachedProject.image}
                        alt={`Preview principal do projeto ${cachedProject.title}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 720px"
                        priority
                      />
                    </div>

                    <ul className="mt-3 grid grid-cols-3 gap-3">
                      {cachedProject.gallery.map((src, index) => (
                        <li
                          key={`${cachedProject.id}-gallery-${index}`}
                          className="relative aspect-square overflow-hidden rounded-lg bg-secondary"
                        >
                          <Image
                            src={src}
                            alt={`Detalhe ${index + 1} do projeto ${cachedProject.title}`}
                            fill
                            className="object-cover"
                            sizes="160px"
                          />
                        </li>
                      ))}
                    </ul>
                  </div>

                  <section className="flex flex-col gap-8">
                    <section className="flex flex-col gap-2">
                      <h3 className="font-dm-serif-display text-xl text-black">
                        Sobre o projeto
                      </h3>
                      <div className="space-y-3 text-sm leading-relaxed text-gray sm:text-base">
                        {cachedProject.about.map((paragraph) => (
                          <p key={paragraph}>{paragraph}</p>
                        ))}
                      </div>
                    </section>

                    <dl className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                      {metaItems.map((item) => {
                        const Icon = META_ICONS[item.key];
                        return (
                          <div key={item.key} className="flex gap-2">
                            <Icon
                              className="mt-0.5 size-5 shrink-0 text-petrol-blue"
                              aria-hidden
                            />
                            <div>
                              <dt className="text-xs font-semibold tracking-[0.12em] text-gray uppercase">
                                {item.label}
                              </dt>
                              <dd className="mt-1 text-sm font-medium text-black">
                                {item.value}
                              </dd>
                            </div>
                          </div>
                        );
                      })}
                    </dl>
                  </section>
                </div>

                <div className="flex flex-col gap-2">
                  <p className="pr-10 text-xs font-semibold tracking-[0.16em] text-gray uppercase">
                    {cachedProject.disciplines}
                  </p>

                  <h2
                    id={titleId}
                    className="font-dm-serif-display text-1xl leading-tight text-black sm:text-2xl lg:text-3xl"
                  >
                    {cachedProject.title}
                  </h2>

                  <p className="font-dm-serif-display italic max-w-2xl text-lg leading-relaxed text-gray">
                    {cachedProject.tagline}
                  </p>

                  <p className="text-sm leading-relaxed text-gray">
                    {cachedProject.description}
                  </p>

                  <hr className="border-gray/15" />
                </div>
              </section>

              <section
                id="modal-casos-ux"
                aria-labelledby="modal-casos-ux-heading"
                className="mt-12 scroll-mt-6"
              >
                <h3
                  id="modal-casos-ux-heading"
                  className="font-dm-serif-display text-2xl text-black"
                >
                  Casos de UX
                </h3>
                <ol className="mt-5 space-y-4">
                  {cachedProject.uxCases.map((item, index) => (
                    <li
                      key={item}
                      className="flex gap-4 border-b border-beige pb-4 last:border-0"
                    >
                      <span className="text-sm font-semibold tabular-nums text-petrol-blue">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="text-sm font-medium text-black sm:text-base">
                        {item}
                      </span>
                    </li>
                  ))}
                </ol>
              </section>

              <section
                id="modal-design-system"
                aria-labelledby="modal-design-system-heading"
                className="mt-12 scroll-mt-6"
              >
                <h3
                  id="modal-design-system-heading"
                  className="font-dm-serif-display text-2xl text-black"
                >
                  Design System
                </h3>

                <div className="mt-6 grid gap-8 sm:grid-cols-2">
                  <div>
                    <p className="text-xs font-semibold tracking-[0.14em] text-gray uppercase">
                      Cores
                    </p>
                    <ul className="mt-4 flex flex-wrap gap-4">
                      {cachedProject.designSystem.colors.map((color) => (
                        <li
                          key={color.hex}
                          className="flex flex-col items-center gap-2"
                        >
                          <span
                            className="size-12 rounded-full border border-beige shadow-sm"
                            style={{ backgroundColor: color.hex }}
                            aria-hidden
                          />
                          <span className="text-xs text-gray">
                            {color.name}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="text-xs font-semibold tracking-[0.14em] text-gray uppercase">
                      Tipografia
                    </p>
                    <ul className="mt-4 space-y-3">
                      {cachedProject.designSystem.typography.map((item) => (
                        <li key={item.role}>
                          <p className="text-sm font-medium text-black">
                            {item.font}
                          </p>
                          <p className="text-xs text-gray">{item.role}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>

              <section
                id="modal-desenvolvimento"
                aria-labelledby="modal-desenvolvimento-heading"
                className="mt-12 scroll-mt-6"
              >
                <h3
                  id="modal-desenvolvimento-heading"
                  className="font-dm-serif-display text-2xl text-black"
                >
                  Desenvolvimento
                </h3>
                <ul className="mt-5 space-y-3">
                  {cachedProject.development.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-sm leading-relaxed text-gray sm:text-base"
                    >
                      <span
                        className="mt-2 size-1.5 shrink-0 rounded-full bg-petrol-blue"
                        aria-hidden
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>

              <section
                id="modal-resultados"
                aria-labelledby="modal-resultados-heading"
                className="mt-12 scroll-mt-6"
              >
                <h3
                  id="modal-resultados-heading"
                  className="font-dm-serif-display text-2xl text-black"
                >
                  Resultados
                </h3>
                <ul className="mt-5 space-y-3">
                  {cachedProject.results.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-sm leading-relaxed text-gray sm:text-base"
                    >
                      <span
                        className="mt-2 size-1.5 shrink-0 rounded-full bg-petrol-blue"
                        aria-hidden
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>

              <div className="mt-10 flex flex-col gap-3 border-t border-beige pt-8 sm:flex-row sm:flex-wrap">
                {liveUrl ? (
                  <a
                    href={liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-petrol-blue px-5 py-2.5 text-sm font-medium text-cream transition-colors hover:bg-[#1f4348]"
                  >
                    Ver projeto ao vivo
                    <HiArrowUpRight className="size-4" aria-hidden />
                  </a>
                ) : null}
                <button
                  type="button"
                  onClick={() => scrollToSection("casos-ux")}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-petrol-blue px-5 py-2.5 text-sm font-medium text-cream transition-colors hover:bg-[#1f4348]"
                >
                  Ver mais detalhes do projeto
                  <HiArrowUpRight className="size-4" aria-hidden />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
