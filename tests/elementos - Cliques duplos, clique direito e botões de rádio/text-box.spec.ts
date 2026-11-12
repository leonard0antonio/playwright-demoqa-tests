import { test, expect } from "@playwright/test";

// 1. TEXT BOX (Formulário completo)
test("Deve preencher o formulário de Text Box e validar o resultado", async ({
  page,
}) => {
  await page.goto("https://demoqa.com/text-box");

  await page.locator("#userName").fill("QA Tester");
  await page.locator("#userEmail").fill("qa@teste.com");
  await page.locator("#currentAddress").fill("Rua dos Bugs, 404");

  // O botão de submit no DemoQA costuma ficar escondido sob o rodapé de anúncios
  const botaoSubmit = page.locator("#submit");
  await botaoSubmit.scrollIntoViewIfNeeded();
  await botaoSubmit.click();

  // Validando se o quadro de resposta apareceu com os dados corretos
  const resultado = page.locator("#output");
  await expect(resultado).toBeVisible();
  await expect(resultado).toContainText("Name:QA Tester");
});
