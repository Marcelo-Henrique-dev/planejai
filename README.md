# Planejai

Planejai é um planejador financeiro pessoal voltado para ajudar o usuário a organizar metas, entender sua capacidade de poupança e receber insights personalizados com o apoio de IA.

A ideia do projeto é transformar dados simples, como renda, gastos fixos, dívidas e objetivo financeiro, em uma visão mais clara do caminho para alcançar uma meta, como uma viagem, um carro, uma reserva de emergência ou qualquer outro plano.

## O que o projeto faz

- Permite montar uma simulação financeira com base em renda, despesas e dívidas.
- Calcula a economia mensal necessária para atingir uma meta em um determinado prazo.
- Exibe um resumo do resultado da simulação de forma visual e objetiva.
- Usa a API do Gemini para gerar insights personalizados, com diagnóstico, sugestões de redução de gastos, ideias de renda extra e recomendações de investimento.
- Mantém um histórico das simulações para o usuário consultar depois.

## Tecnologias utilizadas

- React 19
- TypeScript
- Vite
- React Router
- Tailwind CSS
- Lucide React
- Gemini API (via fetch no frontend)

## Como iniciar o projeto

### 1. Pré-requisitos

- Node.js 18+ (recomendado 20+)
- pnpm

### 2. Instale as dependências

```bash
pnpm install
```

### 3. Configure a variável de ambiente da IA

Crie um arquivo chamado `.env.local` na raiz do projeto e adicione sua chave da API do Gemini:

```env
VITE_GEMINI_API_KEY=sua_chave_aqui
```

### 4. Execute o projeto localmente

```bash
pnpm dev
```

A aplicação ficará disponível em `http://localhost:5173`.

## Scripts disponíveis

```bash
pnpm dev
pnpm build
pnpm lint
pnpm preview
```

## Estrutura geral

- `src/pages` — páginas da aplicação
- `src/components` — interface e blocos visuais
- `src/hooks` — lógica reutilizável e armazenamento local
- `src/service` — integração com a IA
- `src/utils` — cálculos financeiros

## Objetivo do projeto

O Planejai foi criado para ajudar pessoas a tomar decisões financeiras mais conscientes, entendendo se uma meta é viável no prazo desejado e recebendo orientações práticas para melhorar o planejamento financeiro.
