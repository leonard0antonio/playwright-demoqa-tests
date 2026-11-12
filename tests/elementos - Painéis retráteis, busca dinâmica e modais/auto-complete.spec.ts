import { test, expect } from '@playwright/test';

// 13. AUTO COMPLETE (Preenchimento Automático)
  test('Deve digitar uma cor e selecionar na lista de sugestões', async ({ page }) => {
    await page.goto('https://demoqa.com/auto-complete');

    const inputMultiplo = page.locator('#autoCompleteMultipleInput');
    
    // 1. Digitamos apenas parte da palavra
    await inputMultiplo.fill('Re');

    // 2. Aguardamos o menu de sugestões dinâmicas aparecer na tela
    const menuSugestoes = page.locator('.auto-complete__menu');
    await expect(menuSugestoes).toBeVisible();

    // 3. Clicamos na opção que diz "Red"
    await page.locator('.auto-complete__option', { hasText: 'Red' }).click();

    // 4. Validamos se o "chip" vermelho foi adicionado à caixa
    const chipAdicionado = page.locator('.auto-complete__multi-value__label');
    await expect(chipAdicionado).toHaveText('Red');
  });