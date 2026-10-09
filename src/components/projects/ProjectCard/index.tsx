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
      <div className="relative aspect-16/11 overflow-hidden rounded-xl bg-secondary">
        <Image
          src={project.image}
          alt={`Preview do projeto ${project.title}`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>

      <div className="mt-5 flex flex-col gap-2">
        <span className="text-xs font-semibold tracking-[0.14em] text-petrol-blue uppercase">
          {project.category}
        </span>
        <h3 className="font-dm-serif-display text-2xl text-black">
          {project.title}
        </h3>
        <p className="text-sm leading-relaxed text-gray">{project.description}</p>
        <ul className="mt-3 flex flex-wrap gap-2">
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

  if (project.href) {
    return (
      <Link
        href={project.href}
        className={cn("group block", className)}
        aria-label={`Ver projeto ${project.title}`}
      >
        {content}
      </Link>
    );
  }

  return <article className={cn("group first:border-l border-beige first:pl-4", className)}>{content}</article>;
}
