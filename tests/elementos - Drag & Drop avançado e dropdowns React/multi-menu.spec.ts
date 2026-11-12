import { test, expect } from '@playwright/test';

// 11. MULTI-SELECT (Seleção Múltipla)
  test('Deve selecionar múltiplas opções em um dropdown de cores', async ({ page }) => {
    await page.goto('https://demoqa.com/select-menu');

    // No DemoQA o dropdown múltiplo requer digitar e dar Enter, ou clicar nas opções.
    const menuMultiplo = page.locator('div.css-1hwfws3').nth(2); // O 3º seletor da página
    
    // Forma rápida: clicamos na área vazia do input e usamos o teclado
    await menuMultiplo.click();
    await page.keyboard.type('Green');
    await page.keyboard.press('Enter');
    
    await page.keyboard.type('Black');
    await page.keyboard.press('Enter');

    // Validando se os dois "chips" de cores foram criados dentro do input
    await expect(menuMultiplo).toContainText('Green');
    await expect(menuMultiplo).toContainText('Black');
  });