import { test, expect } from '@playwright/test';

// 11. MULTI-SELECT (Seleção Múltipla)
test('Deve selecionar múltiplas opções em um dropdown de cores', async ({ page }) => {
  await page.goto('https://demoqa.com/select-menu');

  // O dropdown múltiplo do DemoQA é um React Select com ids estáveis.
  // Evita seletores de classe gerados (css-*), que mudam a cada build e causam timeout.
  const inputMultiplo = page.locator('#react-select-4-input');

  await inputMultiplo.scrollIntoViewIfNeeded();
  await inputMultiplo.click();

  // No DemoQA o dropdown múltiplo requer digitar e dar Enter para confirmar cada opção.
  await page.keyboard.type('Green');
  await page.keyboard.press('Enter');

  await page.keyboard.type('Black');
  await page.keyboard.press('Enter');

  // Valida se os dois "chips" de cores foram criados dentro do container do React Select
  await expect(page.locator('#react-select-4')).toContainText('Green');
  await expect(page.locator('#react-select-4')).toContainText('Black');
});