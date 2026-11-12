# Playwright DemoQA Tests

Projeto de testes automatizados E2E com [Playwright](https://playwright.dev) contra o site de prática [DemoQA](https://demoqa.com).

## Estrutura do projeto

```
playwright-demoqa-tests/
├── .github/workflows/playwright.yml   # CI no GitHub Actions (roda os testes a cada push/PR)
├── .gitignore
├── package.json                       # Dependências: @playwright/test + @types/node
├── playwright.config.ts               # Config: 3 browsers (chromium, firefox, webkit), reporter HTML
└── tests/
    ├── elementos - Cliques duplos, clique direito e botões de rádio/
    │   ├── text-box.spec.ts           # 1. Text Box (formulário completo)
    │   ├── radio-button.spec.ts       # 2. Radio Button (clique na label, input invisível)
    │   └── buttons.spec.ts            # 3. Duplo clique e clique com botão direito
    ├── elementos - Componentes com mudança de estado/
    │   ├── date-picker.spec.ts        # 4. Date Picker (digitar data + navegar no calendário)
    │   └── progress-bar.spec.ts       # 5. Progress Bar (espera a barra chegar a 100%)
    ├── CRUD em tabelas, alertas de prompt e tooltips/
    │   ├── webtables.spec.ts          # 6. Web Tables (adicionar, buscar e deletar registro)
    │   ├── alerts.spec.ts             # 7. Alerta de prompt (digitar texto e validar resultado)
    │   └── tool-tips.spec.ts          # 8. Tooltip (hover no botão e validar a dica)
    └── Drag & Drop avançado e dropdowns React/
        ├── droppable.spec.ts          # 9. Drag & Drop (arrastar caixa para o alvo)
        ├── select-menu.spec.ts        # 10. React Select (dropdown com grupo de opções)
        └── multi-menu.spec.ts         # 11. Multi-select (selecionar várias cores por teclado)
```

## O que mudou recentemente

- **`progress-bar.spec.ts`**: timeout da espera pelo texto `100%` aumentado de **15s para 30s** — a barra demora para encher e 15s estourava em máquinas/CI mais lentas.
- **Nova pasta `tests/CRUD em tabelas, alertas de prompt e tooltips/`** com 3 novos specs:
  - `webtables.spec.ts` — fluxo completo de CRUD na tabela dinâmica (criar → buscar → deletar → validar tabela vazia).
  - `alerts.spec.ts` — trata o dialog de `prompt` com `page.on("dialog")` enviando texto e valida o `#promptResult`.
  - `tool-tips.spec.ts` — `hover()` no botão e validação do `.tooltip-inner` injetado no DOM.
- **Nova pasta `tests/Drag & Drop avançado e dropdowns React/`** com 3 novos specs:
  - `droppable.spec.ts` — `dragTo()` da caixa para o alvo, validando texto `Dropped!` e a cor de fundo.
  - `select-menu.spec.ts` — React Select (`#withOptGroup`): clica, escolhe opção por texto e valida o valor exibido.
  - `multi-menu.spec.ts` — multi-select de cores digitando `Green`/`Black` + Enter e validando os chips.

## O que falta (roadmap)

### Páginas do DemoQA ainda não cobertas
- **Elements restantes**: Accordion, Auto Complete, Slider, Tabs, Modal Dialogs, Nested Frames, além das abas avançadas de Drag & Drop (Accept, Prevent Propagation, Revert) e os demais tipos de Select Menu (Select One, Old Style, valores múltiplos em outras páginas).
- **Forms**: Practice Form (formulário grande com upload de arquivo, validações e modal de sucesso).
- **Links**: validação de links quebrados e chamadas de API.
- **Upload and Download**: envio e download de arquivos.
- **Dynamic Properties**: elementos com atributos que mudam dinamicamente.
- **Broken Links - Images**: imagens quebradas.

### Melhorias de infraestrutura
- Adicionar **scripts no `package.json`** (`test`, `test:headed`, `test:ui`, `show-report`) — hoje os comandos são rodados direto via `npx`.
- Configurar **`baseURL`** no `playwright.config.ts` para usar `page.goto('/')` em vez de URLs absolutas repetidas em cada spec.
- Habilitar **projetos mobile** (Pixel 5 / iPhone 12) que estão comentados na config.
- Criar **Page Object Model (POM)** para reutilizar locators entre os testes.
- Adicionar **dotenv** (já comentado na config) caso surjam credenciais/ambientes.

## Como rodar os testes

```bash
# Instalar dependências
npm ci

# Instalar os browsers do Playwright
npx playwright install

# Rodar todos os testes (3 browsers)
npx playwright test

# Rodar em um browser específico
npx playwright test --project=chromium

# Rodar um spec específico
npx playwright test tests/elementos\ -\ Componentes\ com\ mudança\ de\ estado/progress-bar.spec.ts

# Abrir o relatório HTML
npx playwright show-report
```

O CI no GitHub Actions (`.github/workflows/playwright.yml`) roda automaticamente em `push`/`pull request` para `main`/`master` e publica o relatório HTML como artifact por 30 dias.
