import { test, expect } from '@playwright/test';

// 9. DRAG AND DROP (Arrastar e soltar em alvo específico)
  test('Deve arrastar a caixa e soltar dentro do alvo', async ({ page }) => {
    await page.goto('https://demoqa.com/droppable');

    const elementoArrastavel = page.locator('#draggable');
    const alvoDeQueda = page.locator('#droppable').first();

    // No DemoQA, a rolagem da página pode afetar o eixo X/Y do drag and drop. 
    // Focamos no alvo primeiro para estabilizar a tela.
    await alvoDeQueda.scrollIntoViewIfNeeded();

    await elementoArrastavel.dragTo(alvoDeQueda);

    // O alvo muda de cor e texto ao receber o elemento
    await expect(alvoDeQueda).toHaveText('Dropped!');
    await expect(alvoDeQueda).toHaveCSS('background-color', 'rgb(70, 130, 180)');
  });