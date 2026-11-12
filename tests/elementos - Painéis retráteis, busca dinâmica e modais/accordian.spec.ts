import { test, expect } from '@playwright/test';

// 12. ACCORDION (Painéis Expansíveis)
test('Deve expandir um painel e validar se o texto ficou visível', async ({ page }) => {
  await page.goto('https://demoqa.com/accordian');

  // O DemoQA migrou para Bootstrap 5: os painéis são <button class="accordion-button">
  // dentro de <h2 class="accordion-header">, e o conteúdo vive em .accordion-body.
  // O texto validado abaixo pertence ao terceiro painel ("Why do we use it?"),
  // que é justamente o que clicamos para expandir.
  const tituloPainel3 = page.getByRole('button', { name: 'Why do we use it?' });
  const itemPainel3 = page.locator('.accordion-item', { has: tituloPainel3 });
  const conteudoPainel3 = itemPainel3.locator('.accordion-body');

  // Garantimos que o conteúdo está invisível antes do clique
  await expect(conteudoPainel3).not.toBeVisible();

  // Clicamos no título para expandir
  await tituloPainel3.scrollIntoViewIfNeeded();
  await tituloPainel3.click();

  // O Playwright aguarda a animação de deslizar (slide down) terminar
  // e valida se o texto agora pode ser lido
  await expect(conteudoPainel3).toBeVisible();
  await expect(conteudoPainel3).toContainText('t is a long established fact that a reader will be distracted');
});