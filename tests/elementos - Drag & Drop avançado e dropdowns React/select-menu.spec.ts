import { test, expect } from '@playwright/test';

// 10. MENUS DE SELEÇÃO MODERNOS (React Select)
  test('Deve interagir com um dropdown dinâmico do React', async ({ page }) => {
    await page.goto('https://demoqa.com/select-menu');

    // Ao invés do tradicional page.selectOption(), temos que simular os cliques do usuário
    const menuModerno = page.locator('#withOptGroup');
    await menuModerno.scrollIntoViewIfNeeded();
    await menuModerno.click();

    // Uma vez clicado, as opções aparecem no DOM. Clicamos na opção desejada por texto.
    await page.locator('text=Group 1, option 2').click();

    // Validamos se o menu fechou mostrando a opção que escolhemos
    await expect(menuModerno).toContainText('Group 1, option 2');
  });