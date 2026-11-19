import { test, expect } from '@playwright/test';

// 11. MULTI-SELECT (Seleção Múltipla)
test('Deve selecionar múltiplas opções em um dropdown de cores', async ({ page }) => {
  await page.goto('https://demoqa.com/select-menu');

  // O dropdown múltiplo do DemoQA é um React Select com ids estáveis.
  // Evita seletores de classe gerados (css-*), que mudam a cada build e causam timeout.
  const inputMultiplo = page.locator('#react-select-4-input');

  await inputMultiplo.scrollIntoViewIfNeeded();
  await inputMultiplo.click();

  // Preencher o input em cada seleção mantém o foco no React Select após o primeiro Enter.
  for (const cor of ['Green', 'Black']) {
    await inputMultiplo.fill(cor);
    await page.keyboard.press('Enter');
    await expect(page.getByRole('button', { name: `Remove ${cor}` })).toBeVisible();
  }
});