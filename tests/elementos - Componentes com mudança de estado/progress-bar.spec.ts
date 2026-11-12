import { test, expect } from '@playwright/test';

// 5. PROGRESS BAR (Esperando uma condição exata)
  test('Deve iniciar a barra de progresso e parar exatamente em 100%', async ({ page }) => {
    await page.goto('https://demoqa.com/progress-bar');

    const botaoStart = page.locator('#startStopButton');
    const barraProgresso = page.locator('.progress-bar');

    await botaoStart.scrollIntoViewIfNeeded();
    await botaoStart.click();

    // Em vez de pausar com tempo fixo, mandamos o Playwright esperar a barra atingir o texto "100%"
    // Aumentamos o timeout porque a barra demora alguns bons segundos para encher
    await expect(barraProgresso).toHaveText('100%', { timeout: 15000 });
    
    const botaoReset = page.locator('#resetButton');
    await expect(botaoReset).toBeVisible();
  });