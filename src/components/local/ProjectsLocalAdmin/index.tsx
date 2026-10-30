"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";

import { Container } from "@/components/Container";
import { Button } from "@/components/ui/button";
import {
  PROJECT_CATEGORIES,
  type Project,
  type ProjectCategory,
} from "@/data/projects";
import {
  applyDraftToProject,
  createProjectFromDraft,
  formatProjectForCopy,
  projectToQuickDraft,
  slugifyProjectId,
  type ProjectQuickDraft,
} from "@/lib/project-from-draft";
import { cn } from "@/lib/utils";

const fieldClass =
  "w-full rounded-lg border border-beige bg-background px-3 py-2.5 text-sm text-black outline-none transition-colors placeholder:text-gray/70 focus-visible:border-petrol-blue focus-visible:ring-3 focus-visible:ring-petrol-blue/20";

const labelClass = "text-xs font-semibold tracking-wide text-gray uppercase";

type FormState = {
  id: string;
  title: string;
  category: ProjectCategory;
  disciplines: string;
  tagline: string;
  description: string;
  tags: string;
  image: string;
  date: string;
  href: string;
  client: string;
  duration: string;
  about: string;
  gallery: string;
  uxCases: string;
  designSystemColors: string;
  designSystemTypography: string;
  development: string;
  results: string;
};

const initialForm = (): FormState => ({
  id: "",
  title: "",
  category: "Web App",
  disciplines: "",
  tagline: "",
  description: "",
  tags: "Next.js, TypeScript, Tailwind CSS",
  image: "/images/projects/thumbnail.svg",
  date: new Date().toISOString().slice(0, 10),
  href: "",
  client: "",
  duration: "4 semanas",
  about: "",
  gallery: "",
  uxCases: "",
  designSystemColors: "",
  designSystemTypography: "",
  development: "",
  results: "",
});

type CatalogEntry = {
  project: Project;
  inLocalFile: boolean;
  isSeed: boolean;
};

export function ProjectsLocalAdmin() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [catalog, setCatalog] = useState<CatalogEntry[]>([]);
  const [editingBase, setEditingBase] = useState<Project | null>(null);
  const [editingPreviousId, setEditingPreviousId] = useState<string | null>(
    null,
  );
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showModalContent, setShowModalContent] = useState(false);

  const isEditing = editingBase != null;

  const preview = useMemo(() => {
    if (!form.title.trim()) return null;
    try {
      const draft = formToDraft(form);
      return editingBase
        ? applyDraftToProject(editingBase, draft)
        : createProjectFromDraft(draft);
    } catch {
      return null;
    }
  }, [form, editingBase]);

  const loadCatalog = useCallback(async () => {
    const response = await fetch("/api/local/projects");
    if (!response.ok) return;
    const data = (await response.json()) as { catalog: CatalogEntry[] };
    setCatalog(data.catalog);
  }, []);

  useEffect(() => {
    void loadCatalog();
  }, [loadCatalog]);

  useEffect(() => {
    if (isEditing || form.id || !form.title.trim()) return;
    setForm((current) => ({
      ...current,
      id: slugifyProjectId(form.title),
    }));
  }, [form.id, form.title, isEditing]);

  function startEdit(project: Project) {
    const draft = projectToQuickDraft(project);
    setEditingBase(project);
    setEditingPreviousId(project.id);
    setForm({
      id: draft.id ?? "",
      title: draft.title,
      category: draft.category,
      disciplines: draft.disciplines ?? "",
      tagline: draft.tagline,
      description: draft.description,
      tags: draft.tags,
      image: draft.image ?? initialForm().image,
      date: draft.date ?? initialForm().date,
      href: draft.href ?? "",
      client: draft.client ?? "",
      duration: draft.duration ?? "4 semanas",
      about: draft.about ?? "",
      gallery: draft.gallery ?? "",
      uxCases: draft.uxCases ?? "",
      designSystemColors: draft.designSystemColors ?? "",
      designSystemTypography: draft.designSystemTypography ?? "",
      development: draft.development ?? "",
      results: draft.results ?? "",
    });
    setShowAdvanced(true);
    setShowModalContent(true);
    setStatus(null);
  }

  function cancelEdit() {
    setEditingBase(null);
    setEditingPreviousId(null);
    setForm(initialForm());
    setStatus(null);
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setStatus(null);

    const response = await fetch("/api/local/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formToDraft(form),
        base: editingBase ?? undefined,
        previousId: editingPreviousId ?? undefined,
      }),
    });

    setLoading(false);

    if (!response.ok) {
      const error = (await response.json()) as { error?: string };
      setStatus(error.error ?? "Não foi possível salvar.");
      return;
    }

    setStatus(
      isEditing
        ? "Alterações salvas. Confira em /projetos."
        : "Projeto salvo. Confira em /projetos.",
    );
    cancelEdit();
    await loadCatalog();
  }

  async function handleDelete(entry: CatalogEntry) {
    if (!entry.inLocalFile) return;
    setLoading(true);
    await fetch(
      `/api/local/projects?id=${encodeURIComponent(entry.project.id)}`,
      { method: "DELETE" },
    );
    setLoading(false);
    if (editingPreviousId === entry.project.id) {
      cancelEdit();
    }
    await loadCatalog();
    setStatus(
      entry.isSeed
        ? "Override local removido — voltou ao projeto em projects.ts."
        : "Projeto local removido.",
    );
  }

  async function copyPreview() {
    if (!preview) return;
    await navigator.clipboard.writeText(formatProjectForCopy(preview));
    setStatus("JSON copiado — cole em src/data/projects.ts quando for publicar.");
  }

  return (
    <Container className="py-10 sm:py-14">
      <header className="flex flex-col gap-4 border-b border-beige pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold tracking-[0.14em] text-petrol-blue uppercase">
            Somente localhost • dev
          </p>
          <h1 className="mt-2 font-dm-serif-display text-3xl text-black sm:text-4xl">
            Cadastro rápido de projetos
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray sm:text-base">
            Preenche o essencial e gera o restante com o padrão do portfólio.
            Os itens ficam em{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 text-xs">
              src/data/projects.local.json
            </code>{" "}
            até você copiar para produção.
          </p>
        </div>
        <Link
          href="/projetos"
          className="inline-flex h-9 items-center justify-center rounded-full border border-petrol-blue px-4 text-sm font-medium text-petrol-blue transition-colors hover:bg-petrol-blue/5"
        >
          Ver listagem pública
        </Link>
      </header>

      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:items-start">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 rounded-2xl border border-beige bg-[#F5F4ED]/60 p-5 sm:p-6"
        >
          {isEditing ? (
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-petrol-blue/30 bg-petrol-blue/5 px-4 py-3">
              <p className="text-sm text-black">
                Editando{" "}
                <span className="font-medium">{editingBase?.title}</span>
              </p>
              <button
                type="button"
                onClick={cancelEdit}
                className="text-sm font-medium text-petrol-blue hover:underline"
              >
                Cancelar edição
              </button>
            </div>
          ) : null}

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Título">
              <input
                required
                className={fieldClass}
                value={form.title}
                onChange={(e) =>
                  setForm({
                    ...form,
                    title: e.target.value,
                    ...(isEditing ? {} : { id: "" }),
                  })
                }
                placeholder="Nome do projeto"
              />
            </Field>
            <Field label="ID (slug)">
              <input
                required
                className={fieldClass}
                value={form.id}
                onChange={(e) => setForm({ ...form, id: e.target.value })}
                pattern="[a-z0-9-]+"
                title="Letras minúsculas, números e hífens"
              />
            </Field>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Categoria">
              <select
                className={fieldClass}
                value={form.category}
                onChange={(e) =>
                  setForm({
                    ...form,
                    category: e.target.value as ProjectCategory,
                  })
                }
              >
                {PROJECT_CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Data (ISO)">
              <input
                type="date"
                required
                className={fieldClass}
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
              />
            </Field>
          </div>

          <Field label="Tagline">
            <input
              required
              className={fieldClass}
              value={form.tagline}
              onChange={(e) => setForm({ ...form, tagline: e.target.value })}
              placeholder="Frase curta de impacto"
            />
          </Field>

          <Field label="Descrição (card)">
            <textarea
              required
              rows={3}
              className={cn(fieldClass, "resize-y min-h-[5rem]")}
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              placeholder="Resumo exibido na grade de projetos"
            />
          </Field>

          <Field label="Tags (separadas por vírgula)">
            <input
              required
              className={fieldClass}
              value={form.tags}
              onChange={(e) => setForm({ ...form, tags: e.target.value })}
            />
          </Field>

          <Field label="Imagem (caminho em /public)">
            <input
              className={fieldClass}
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              placeholder="/images/projects/meu-projeto.webp"
            />
          </Field>

          <button
            type="button"
            className="self-start text-sm font-medium text-petrol-blue underline-offset-4 hover:underline"
            onClick={() => setShowAdvanced((value) => !value)}
          >
            {showAdvanced ? "Ocultar campos extras" : "Campos extras"}
          </button>

          {showAdvanced ? (
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Disciplinas">
                <input
                  className={fieldClass}
                  value={form.disciplines}
                  onChange={(e) =>
                    setForm({ ...form, disciplines: e.target.value })
                  }
                  placeholder="Auto se vazio"
                />
              </Field>
              <Field label="Cliente">
                <input
                  className={fieldClass}
                  value={form.client}
                  onChange={(e) => setForm({ ...form, client: e.target.value })}
                  placeholder="Nome do cliente"
                />
              </Field>
              <Field label="Duração">
                <input
                  className={fieldClass}
                  value={form.duration}
                  onChange={(e) =>
                    setForm({ ...form, duration: e.target.value })
                  }
                />
              </Field>
              <Field label="Link externo (opcional)">
                <input
                  className={fieldClass}
                  value={form.href}
                  onChange={(e) => setForm({ ...form, href: e.target.value })}
                  placeholder="https://"
                />
              </Field>
            </div>
          ) : null}

          <button
            type="button"
            className="self-start text-sm font-medium text-petrol-blue underline-offset-4 hover:underline"
            onClick={() => setShowModalContent((value) => !value)}
          >
            {showModalContent
              ? "Ocultar conteúdo do modal"
              : "Conteúdo do modal (opcional)"}
          </button>

          {showModalContent ? (
            <div className="flex flex-col gap-6 rounded-xl border border-beige bg-background/80 p-4 sm:p-5">
              <p className="text-xs leading-relaxed text-gray">
                Seções do preview do modal. Deixe em branco para usar o padrão
                automático (novos projetos) ou manter o conteúdo atual (ao
                editar).
              </p>

              <ModalSection title="Visão geral">
                <Field label="Sobre o projeto (um parágrafo por linha)">
                  <textarea
                    rows={4}
                    className={cn(fieldClass, "resize-y min-h-[6rem]")}
                    value={form.about}
                    onChange={(e) =>
                      setForm({ ...form, about: e.target.value })
                    }
                    placeholder="Contexto do case, desafio, abordagem…"
                  />
                </Field>
                <Field label="Galeria do modal (até 3 imagens, uma por linha)">
                  <textarea
                    rows={3}
                    className={cn(fieldClass, "resize-y")}
                    value={form.gallery}
                    onChange={(e) =>
                      setForm({ ...form, gallery: e.target.value })
                    }
                    placeholder="/images/projects/detalhe-1.webp"
                  />
                </Field>
              </ModalSection>

              <ModalSection title="Casos de UX">
                <Field label="Itens (um por linha)">
                  <textarea
                    rows={4}
                    className={cn(fieldClass, "resize-y")}
                    value={form.uxCases}
                    onChange={(e) =>
                      setForm({ ...form, uxCases: e.target.value })
                    }
                    placeholder="Jornada do usuário"
                  />
                </Field>
              </ModalSection>

              <ModalSection title="Design System">
                <Field label="Cores (Nome #HEX por linha)">
                  <textarea
                    rows={4}
                    className={cn(fieldClass, "resize-y font-mono text-xs")}
                    value={form.designSystemColors}
                    onChange={(e) =>
                      setForm({ ...form, designSystemColors: e.target.value })
                    }
                    placeholder={"Off-white #F7F3ED\nPetrol #28545A"}
                  />
                </Field>
                <Field label="Tipografia (Papel | Fonte por linha)">
                  <textarea
                    rows={3}
                    className={cn(fieldClass, "resize-y")}
                    value={form.designSystemTypography}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        designSystemTypography: e.target.value,
                      })
                    }
                    placeholder={"Títulos | DM Serif Display\nTexto | Manrope"}
                  />
                </Field>
              </ModalSection>

              <ModalSection title="Desenvolvimento">
                <Field label="Itens (um por linha)">
                  <textarea
                    rows={4}
                    className={cn(fieldClass, "resize-y")}
                    value={form.development}
                    onChange={(e) =>
                      setForm({ ...form, development: e.target.value })
                    }
                  />
                </Field>
              </ModalSection>

              <ModalSection title="Resultados">
                <Field label="Itens (um por linha)">
                  <textarea
                    rows={4}
                    className={cn(fieldClass, "resize-y")}
                    value={form.results}
                    onChange={(e) =>
                      setForm({ ...form, results: e.target.value })
                    }
                  />
                </Field>
              </ModalSection>
            </div>
          ) : null}

          <div className="flex flex-wrap gap-3 pt-2">
            <Button type="submit" disabled={loading} size="lg">
              {loading
                ? "Salvando…"
                : isEditing
                  ? "Salvar alterações"
                  : "Salvar projeto local"}
            </Button>
            {isEditing ? (
              <Button
                type="button"
                variant="outline"
                disabled={loading}
                onClick={cancelEdit}
              >
                Descartar
              </Button>
            ) : null}
            <Button
              type="button"
              variant="outline"
              disabled={!preview}
              onClick={() => void copyPreview()}
            >
              Copiar JSON do preview
            </Button>
          </div>

          {status ? (
            <p className="text-sm text-petrol-blue" role="status">
              {status}
            </p>
          ) : null}
        </form>

        <aside className="flex flex-col gap-6">
          <section className="rounded-2xl border border-beige bg-background p-5">
            <h2 className="font-dm-serif-display text-xl text-black">
              Preview
            </h2>
            {preview ? (
              <div className="mt-4 space-y-2 text-sm text-gray">
                <p className="font-medium text-black">{preview.title}</p>
                <p className="text-xs uppercase tracking-wide text-petrol-blue">
                  {preview.category}
                </p>
                <p className="line-clamp-4">{preview.description}</p>
                <p className="text-xs text-gray">
                  id: <span className="text-black">{preview.id}</span>
                </p>
              </div>
            ) : (
              <p className="mt-4 text-sm text-gray">
                Preencha o título para ver o objeto gerado.
              </p>
            )}
          </section>

          <section className="rounded-2xl border border-beige bg-background p-5">
            <h2 className="font-dm-serif-display text-xl text-black">
              Projetos ({catalog.length})
            </h2>
            <p className="mt-2 text-xs leading-relaxed text-gray">
              Edite qualquer item. Projetos do{" "}
              <code className="text-[0.65rem]">projects.ts</code> geram override
              local ao salvar.
            </p>
            {catalog.length === 0 ? (
              <p className="mt-3 text-sm text-gray">Nenhum projeto encontrado.</p>
            ) : (
              <ul className="mt-4 flex max-h-[28rem] flex-col gap-3 overflow-y-auto pr-1">
                {catalog.map((entry) => {
                  const { project } = entry;
                  const isActive = editingPreviousId === project.id;

                  return (
                    <li
                      key={project.id}
                      className={cn(
                        "flex items-start justify-between gap-3 rounded-xl border px-3 py-2.5",
                        isActive
                          ? "border-petrol-blue bg-petrol-blue/5"
                          : "border-beige",
                      )}
                    >
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-black">
                          {project.title}
                        </p>
                        <p className="text-xs text-gray">{project.id}</p>
                        <p className="mt-1 text-[0.65rem] font-medium uppercase tracking-wide text-petrol-blue">
                          {entry.isSeed
                            ? entry.inLocalFile
                              ? "Base + override local"
                              : "Base (projects.ts)"
                            : "Somente local"}
                        </p>
                      </div>
                      <div className="flex shrink-0 flex-col items-end gap-1.5">
                        <button
                          type="button"
                          disabled={loading}
                          onClick={() => startEdit(project)}
                          className="text-xs font-medium text-petrol-blue hover:underline"
                        >
                          Editar
                        </button>
                        {entry.inLocalFile ? (
                          <button
                            type="button"
                            disabled={loading}
                            onClick={() => void handleDelete(entry)}
                            className="text-xs font-medium text-destructive hover:underline"
                          >
                            {entry.isSeed ? "Resetar" : "Remover"}
                          </button>
                        ) : null}
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </section>
        </aside>
      </div>
    </Container>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className={labelClass}>{label}</span>
      {children}
    </label>
  );
}

function ModalSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="flex flex-col gap-3 border-0 p-0">
      <legend className="font-dm-serif-display text-lg text-black">{title}</legend>
      {children}
    </fieldset>
  );
}

function formToDraft(form: FormState): ProjectQuickDraft {
  return {
    id: form.id,
    title: form.title,
    category: form.category,
    disciplines: form.disciplines || undefined,
    tagline: form.tagline,
    description: form.description,
    tags: form.tags,
    image: form.image || undefined,
    date: form.date || undefined,
    href: form.href || undefined,
    client: form.client || undefined,
    duration: form.duration || undefined,
    about: form.about || undefined,
    gallery: form.gallery || undefined,
    uxCases: form.uxCases || undefined,
    designSystemColors: form.designSystemColors || undefined,
    designSystemTypography: form.designSystemTypography || undefined,
    development: form.development || undefined,
    results: form.results || undefined,
  };
}
