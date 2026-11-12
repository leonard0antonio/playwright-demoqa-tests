import { test, expect } from '@playwright/test';

// 14. MODALS (Janelas sobrepostas dentro da página)
  test('Deve abrir um modal, validar o texto e fechar', async ({ page }) => {
    await page.goto('https://demoqa.com/modal-dialogs');

    const botaoAbrirModal = page.locator('#showSmallModal');
    await botaoAbrirModal.scrollIntoViewIfNeeded();
    await botaoAbrirModal.click();

    // Modais HTML não disparam o evento page.on('dialog'). 
    // Eles são apenas elementos comuns (divs) que aparecem por cima de tudo.
    const modal = page.locator('.modal-content');
    await expect(modal).toBeVisible();
    
    // Validamos o título e o corpo do modal
    await expect(modal.locator('.modal-title')).toHaveText('Small Modal');
    await expect(modal.locator('.modal-body')).toContainText('This is a small modal. It has very less content');

    // Fechamos o modal clicando no botão Close
    await modal.locator('#closeSmallModal').click();

    // Garantimos que o modal desapareceu da tela
    await expect(modal).not.toBeVisible();
  });