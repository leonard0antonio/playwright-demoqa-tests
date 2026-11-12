import { test, expect } from "@playwright/test";

// 2. RADIO BUTTONS (Elementos ocultos por CSS)
test("Deve selecionar um botão de rádio clicando na label", async ({
  page,
}) => {
  await page.goto("https://demoqa.com/radio-button");

  // No DemoQA, a bolinha do radio (input) tem o CSS 'opacity: 0' (invisível) e está coberta pela 'label'.
  // Se tentarmos usar o .check() nativo no input, o Playwright avisa que está invisível.
  // A solução correta, simulando o usuário, é clicar no texto (label) associado a ele.
  await page.locator('label[for="yesRadio"]').click();

  // Validamos a mensagem de sucesso que aparece abaixo
  const mensagem = page.locator(".text-success");
  await expect(mensagem).toHaveText("Yes");
});
