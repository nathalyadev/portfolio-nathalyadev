import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

export function ProjectCard({
  project,
  className,
}: {
  project: Project;
  className?: string;
}) {
  const content = (
    <>
      <div className="relative aspect-16/11 w-full shrink-0 overflow-hidden rounded-xl bg-secondary">
        <Image
          src={project.image}
          alt={`Preview do projeto ${project.title}`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>

      <div className="mt-4 flex flex-1 flex-col">
        <span className="text-xs font-semibold tracking-[0.14em] text-petrol-blue uppercase">
          {project.category}
        </span>

        <h3 className="mt-2 min-h-14 font-dm-serif-display text-2xl leading-tight text-black">
          {project.title}
        </h3>

        <p className="mt-2 line-clamp-3 min-h-18 text-sm leading-relaxed text-gray">
          {project.description}
        </p>

        <ul className="mt-auto flex flex-wrap gap-2 pt-2">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-beige px-3 py-1 text-xs font-medium text-gray"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </>
  );

  const cardClassName = cn("group flex h-full flex-col", className);

  if (project.href) {
    return (
      <Link
        href={project.href}
        className={cardClassName}
        aria-label={`Ver projeto ${project.title}`}
      >
        {content}
      </Link>
    );
  }

  return <article className={cardClassName}>{content}</article>;
}
