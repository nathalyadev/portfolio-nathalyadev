import Image from "next/image";
import { HiArrowUpRight } from "react-icons/hi2";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

export function ProjectCard({
  project,
  className,
  onOpenDetails,
}: {
  project: Project;
  className?: string;
  onOpenDetails?: (project: Project) => void;
}) {
  return (
    <article
      className={cn(
        "group flex h-full flex-col rounded-xl border border-beige bg-[#F5F4ED] p-4 sm:p-5",
        className,
      )}
    >
      <button
        type="button"
        onClick={() => onOpenDetails?.(project)}
        className="relative aspect-16/11 w-full shrink-0 cursor-pointer overflow-hidden rounded-xl bg-secondary text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-petrol-blue"
        aria-label={`Ver detalhes do projeto ${project.title}`}
      >
        <Image
          src={project.image}
          alt={`Preview do projeto ${project.title}`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </button>

      <div className="mt-4 flex flex-1 flex-col">
        <span className="text-xs font-semibold tracking-[0.14em] text-petrol-blue uppercase">
          {project.category}
        </span>

        <h3 className="mt-2 font-dm-serif-display text-xl leading-tight text-black sm:text-2xl">
          {project.title}
        </h3>

        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-gray">
          {project.description}
        </p>

        <ul className="mt-auto flex flex-wrap gap-2 pt-4">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-beige px-3 py-1 text-xs font-medium text-gray"
            >
              {tag}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex items-end justify-end gap-4 pt-8">
          <button
            type="button"
            onClick={() => onOpenDetails?.(project)}
            className="cursor-pointer hover:underline inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-black transition-colors hover:text-petrol-blue"
          >
            Ver detalhes
            <HiArrowUpRight className="size-3.5" aria-hidden />
          </button>
        </div>
      </div>
    </article>
  );
}
