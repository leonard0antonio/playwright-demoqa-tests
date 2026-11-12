import { test, expect } from "@playwright/test";

// 7. ALERTAS DE PROMPT (Digitar texto no alerta do navegador)
test("Deve digitar um texto no alerta de prompt e validar o resultado", async ({
  page,
}) => {
  await page.goto("https://demoqa.com/alerts");

  // Preparamos a "escuta" ANTES de clicar.
  // Desta vez, verificamos se o alerta é do tipo 'prompt' e enviamos um texto ao aceitar.
  page.on("dialog", async (dialog) => {
    expect(dialog.type()).toBe("prompt");
    await dialog.accept("Mestre do Playwright");
  });

  const botaoPrompt = page.locator("#promtButton");
  await botaoPrompt.scrollIntoViewIfNeeded();
  await botaoPrompt.click();

  // O DemoQA cria um texto na tela com o que foi digitado no alerta
  const resultado = page.locator("#promptResult");
  await expect(resultado).toContainText("Mestre do Playwright");
});
