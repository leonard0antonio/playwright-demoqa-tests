import { test, expect } from '@playwright/test';

// 12. ACCORDION (Painéis Expansíveis)
  test('Deve expandir um painel e validar se o texto ficou visível', async ({ page }) => {
    await page.goto('https://demoqa.com/accordian');

    // No DemoQA, o primeiro painel já vem aberto por padrão. 
    // Vamos interagir com o segundo painel.
    const tituloPainel2 = page.locator('#section2Heading');
    const conteudoPainel2 = page.locator('#section2Content');

    // Garantimos que o conteúdo 2 está invisível antes do clique
    await expect(conteudoPainel2).not.toBeVisible();

    // Clicamos no título para expandir
    await tituloPainel2.scrollIntoViewIfNeeded();
    await tituloPainel2.click();

    // O Playwright aguarda a animação de deslizar (slide down) terminar 
    // e valida se o texto agora pode ser lido
    await expect(conteudoPainel2).toBeVisible();
    await expect(conteudoPainel2).toContainText('t is a long established fact that a reader will be distracted');
  });