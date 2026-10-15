# Portfolio Nathálya Dev

> Portfólio pessoal de Front-end Developer, com foco em produtos digitais, e-commerce, performance e UI Engineering.

<!--
  Nathálya Dev
  Front-end Development · UI Engineering · Performance
-->

<p align="left">
  <img src="https://img.shields.io/badge/STATUS-ONLINE-28545A?style=flat-square" alt="Status do projeto" />
  <img src="https://img.shields.io/badge/Next.js-16-000000?style=flat-square&logo=nextdotjs&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
</p>

---

## Sobre o projeto

O **Portfolio Nathálya Dev** é o site institucional e vitrine profissional de **Nathálya Souza**, desenvolvedora front-end com quase 4 anos de experiência em React, Next.js e TypeScript.

O objetivo é apresentar serviços, projetos e trajetória de forma clara e acessível, priorizando organização, responsividade e qualidade da experiência do usuário — do primeiro contato à solicitação de orçamento.

### Funcionalidades

- **Hero** com posicionamento profissional e CTAs para projetos e contato
- **Serviços** — desenvolvimento front-end, e-commerce, performance e UI Engineering
- **Projetos** em destaque (landing pages e produtos digitais)
- **Sobre** com experiência, especialidade e foco em produtos digitais/e-commerce
- **Contato** via e-mail para solicitação de orçamento
- **FAQ** com dúvidas frequentes sobre processo, prazos e escopo
- **Stats** com indicadores de experiência e entrega
- Layout responsivo, tipografia expressiva e navegação por âncoras

## Preview

Acesse a versão publicada: [portfolio-nathalyadev.vercel.app](https://portfolio-nathalyadev.vercel.app/)

<!-- Adicione um print ou GIF em ./docs/preview.png quando disponível.
![Preview do projeto](./docs/preview.png)
-->

## Tecnologias

As principais tecnologias utilizadas neste projeto são:

- **Next.js 16** — App Router, estrutura da aplicação e otimização de assets
- **React 19** — interfaces componentizadas
- **TypeScript** — tipagem estática e maior previsibilidade do código
- **Tailwind CSS 4** — estilização utilitária e responsividade
- **Base UI / shadcn** — primitives e componentes de interface
- **react-icons** — ícones da interface
- **next/font** — tipografia (Manrope e DM Serif Display)

## Estrutura do projeto

```text
src/
├── app/              # Rotas e layout raiz (App Router)
├── components/       # UI por domínio (hero, projects, about, faq…)
├── data/             # Conteúdo estático (projetos, serviços, FAQ, stats)
├── global/           # Estilos globais
├── lib/              # Utilitários compartilhados
├── template/         # Composição das páginas
└── utils/            # Helpers (ex.: rota ativa)
```

O conteúdo editorial (textos, listas de projetos e serviços) fica centralizado em `src/data/`, facilitando atualizações sem alterar a estrutura dos componentes.

## Pré-requisitos

Antes de começar, você precisa ter instalado:

- **Node.js** — versão compatível com Next.js 16
- **Git**
- **Yarn** — gerenciador de pacotes do repositório (`yarn@1.22.22`)

## Instalação

**1. Clone o repositório**

```bash
git clone https://github.com/nathalyadev/portfolio-nathalyadev.git
```

**2. Acesse a pasta**

```bash
cd portfolio-nathalyadev
```

**3. Instale as dependências**

```bash
yarn install
```

**4. Execute o projeto**

```bash
yarn dev
```

A aplicação estará disponível em `http://localhost:3000`.

## Scripts disponíveis

| Comando | Descrição |
|---|---|
| `yarn dev` | Inicia o ambiente de desenvolvimento. |
| `yarn build` | Gera a versão de produção. |
| `yarn start` | Inicia a aplicação em produção. |
| `yarn lint` | Executa a análise estática com ESLint. |

## Decisões técnicas

- **Arquitetura:** App Router do Next.js com composição por templates e componentes por seção
- **Conteúdo:** dados desacoplados em `src/data/` para manter a UI reutilizável e o conteúdo fácil de editar
- **Componentização:** seções independentes (Hero, Services, Projects, About, Contact, FAQ, Stats) compostas na home
- **Responsividade:** mobile-first com Tailwind e layout adaptativo por breakpoint
- **Performance:** `next/image`, fontes via `next/font` e estrutura enxuta sem backend
- **Acessibilidade:** landmarks semânticos, `aria-labelledby` nas seções e hierarquia de headings

## Aprendizados e próximos passos

- Separar conteúdo de apresentação facilita evoluir o portfólio sem refatorar a UI
- Próximos passos possíveis: página dedicada de projetos, preview visual no README e novas cases

## Demonstração

- **Aplicação:** [portfolio-nathalyadev.vercel.app](https://portfolio-nathalyadev.vercel.app/)
- **Repositório:** [github.com/nathalyadev/portfolio-nathalyadev](https://github.com/nathalyadev/portfolio-nathalyadev)

## Autoria

Desenvolvido por **Nathálya Souza** — Front-end Developer com foco em React, Next.js, TypeScript e UI Engineering.

- **Portfólio:** [portfolio-nathalyadev.vercel.app](https://portfolio-nathalyadev.vercel.app/)
- **GitHub:** [@nathalyadev](https://github.com/nathalyadev)
- **LinkedIn:** [nathalya-souza-dev](https://www.linkedin.com/in/nathalya-souza-dev/)

---

<p align="center">
  <sub>Nathálya Dev · Front-end Development & UI Engineering</sub>
</p>
