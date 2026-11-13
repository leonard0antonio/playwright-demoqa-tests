# Playwright DemoQA Tests

Projeto de testes automatizados E2E com [Playwright](https://playwright.dev) contra o site de prática [DemoQA](https://demoqa.com).

## Pré-requisitos

- [Node.js](https://nodejs.org/) (v18 ou superior)
- [npm](https://www.npmjs.com/) (viene com o Node.js)
- Browsers do Playwright (instalados via `npx playwright install`)

## Estrutura do projeto

```
playwright-demoqa-tests/
├── .github/workflows/playwright.yml   # CI no GitHub Actions (push/PR para main/master)
├── .gitignore
├── package.json                       # Dependências: @playwright/test + @types/node
├── playwright.config.ts               # Config: 3 browsers (chromium, firefox, webkit), reporter HTML
└── tests/
    ├── elementos - Cliques duplos, clique direito e botões de rádio/
    │   ├── text-box.spec.ts           # 1. Text Box — formulário completo com validação de campos
    │   ├── radio-button.spec.ts       # 2. Radio Button — clique na label, input invisível
    │   └── buttons.spec.ts            # 3. Duplo clique e clique com botão direito
    ├── elementos - Componentes com mudança de estado/
    │   ├── date-picker.spec.ts        # 4. Date Picker — digitar data + navegar no calendário
    │   └── progress-bar.spec.ts       # 5. Progress Bar — espera a barra chegar a 100%
    ├── CRUD em tabelas, alertas de prompt e tooltips/
    │   ├── webtables.spec.ts          # 6. Web Tables — adicionar, buscar e deletar registro
    │   ├── alerts.spec.ts             # 7. Alerta de prompt — digitar texto e validar resultado
    │   └── tool-tips.spec.ts          # 8. Tooltip — hover no botão e validar a dica
    ├── elementos - Painéis retráteis, busca dinâmica e modais/
    │   ├── accordian.spec.ts          # 12. Accordion — painéis expansíveis
    │   ├── auto-complete.spec.ts      # 13. Auto Complete — preenchimento automático com sugestões
    │   └── modal-dialogs.spec.ts      # 14. Modal Dialogs — abrir, validar e fechar modal
    └── Drag & Drop avançado e dropdowns React/
        ├── droppable.spec.ts          # 9. Drag & Drop — arrastar caixa para o alvo
        ├── select-menu.spec.ts        # 10. React Select — dropdown com grupo de opções
        └── multi-menu.spec.ts         # 11. Multi-select — selecionar várias cores por teclado
```

## Visão geral do projeto

Este projeto está concluído e representa uma suíte de testes end-to-end para os principais componentes do DemoQA, cobrindo interações de UI, estados visuais, formulários, drag-and-drop, dropdowns e modais.

### Cobertura implementada

- **Text Box e formulários**
- **Botões, clique duplo e clique direito**
- **Radio buttons e seleção de opções**
- **Date picker e progress bar**
- **CRUD em tabela dinâmica**
- **Alertas de prompt e tooltips**
- **Drag & drop e menus React**
- **Accordion, auto complete e modal dialogs**

O objetivo foi validar comportamentos reais de usuário com automação estável, legível e reutilizável, usando boas práticas de espera, seleção e assertions.

## Como rodar os testes

```bash
# Instalar dependências
npm ci

# Instalar os browsers do Playwright
npx playwright install

# Rodar todos os testes (3 browsers: chromium, firefox, webkit)
npx playwright test

# Rodar em um browser específico
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit

# Rodar em modo headed (visualizar o navegador)
npx playwright test --headed

# Rodar um spec específico
npx playwright test tests/elementos\ -\ Componentes\ com\ mudança\ de\ estado/progress-bar.spec.ts

# Rodar um spec específico em modo headed
npx playwright test webtables --project=chromium --headed

# Rodar apenas um teste específico por nome
npx playwright test -g "Deve adicionar"

# Abrir o relatório HTML após a execução
npx playwright show-report

# Rodar em modo UI (interface interativa do Playwright)
npx playwright test --ui

# Rodar em modo debug (pausa em cada passo)
npx playwright test --debug
```

## Configuração (`playwright.config.ts`)

O arquivo `playwright.config.ts` define:

- **3 projetos**: chromium, firefox e webkit
- **Reporter**: HTML (gerado em `playwright-report/`)
- **Trace**: ativado em primeira tentativa (`trace: 'on-first-retry'`)
- **Vídeo**: gravado apenas em falhas (`video: 'retain-on-failure'`)
- **Screenshot**: capturado apenas em falhas (`screenshot: 'only-on-failure'`)

## Boas práticas adotadas

- **Waits explícitos**: uso de `waitFor({ state: 'visible' })` antes de interagir com elementos que podem ter animação (ex: modal do Web Tables).
- **`scrollIntoViewIfNeeded()`**: garante que botões de submit estejam visíveis antes do clique, evitando que rodapés ou anúncios cubram o elemento.
- **Comentários em português**: todos os specs contêm comentários explicando cada passo do fluxo.
- **Validações assertivas**: uso de `expect()` para validar visibilidade, texto presente e ausência de elementos.
- **Isolamento de testes**: cada spec é independente e navega para sua própria URL no DemoQA.

## CI/CD

O pipeline no GitHub Actions (`.github/workflows/playwright.yml`) roda automaticamente em `push` e `pull request` para `main`/`master`, executando os testes nos 3 browsers e publicando o relatório HTML como artifact por 30 dias.

## Fechamento com chave de ouro

Este projeto foi concluído com sucesso e está pronto para uso como base de automação E2E em ambiente de validação, desenvolvimento e CI/CD. A suíte cobre os principais fluxos do DemoQA com boa estabilidade, clareza na manutenção e execução em múltiplos browsers.

Com isso, o projeto fica finalizado e entregue em um estado funcional, documentado e pronto para evoluir com novas automações.
