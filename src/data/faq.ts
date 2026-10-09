export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "tipos",
    question: "Quais tipos de projetos você desenvolve?",
    answer:
      "Landing pages, produtos digitais, e-commerces e interfaces web com React, Next.js e TypeScript — do layout à entrega responsiva.",
  },
  {
    id: "processo",
    question: "Como funciona o processo?",
    answer:
      "Começamos alinhando objetivos e referências, seguimos para prototipação/layout quando necessário e avançamos no desenvolvimento com entregas parciais para validação.",
  },
  {
    id: "prazo",
    question: "Qual o prazo médio de entrega?",
    answer:
      "Depende do escopo. Landing pages costumam levar de 1 a 3 semanas; produtos maiores são estimados após o briefing.",
  },
  {
    id: "design",
    question: "Você trabalha com design também?",
    answer:
      "Sim. Posso partir de um Figma pronto ou ajudar na interface, sempre com foco em usabilidade e implementação fiel.",
  },
  {
    id: "orcamento",
    question: "Como funciona o orçamento?",
    answer:
      "Após entender o escopo, envio uma proposta com prazo, entregáveis e investimento. Sem surpresas no meio do caminho.",
  },
  {
    id: "alteracoes",
    question: "Posso solicitar alterações durante o projeto?",
    answer:
      "Sim. Rodadas de ajuste fazem parte do processo e ficam definidas na proposta para manter clareza e ritmo de entrega.",
  },
];
