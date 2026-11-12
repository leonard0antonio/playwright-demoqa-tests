import { test, expect } from "@playwright/test";

// 8. TOOLTIPS (Caixas de dicas flutuantes)
test("Deve passar o mouse no botão e validar a dica flutuante", async ({
  page,
}) => {
  await page.goto("https://demoqa.com/tool-tips");

  const botao = page.locator("#toolTipButton");

  // O tooltip não existe no HTML até o mouse parar em cima do botão
  await botao.hover();

  // O Playwright espera o elemento de classe .tooltip-inner ser injetado no DOM
  const tooltip = page.locator(".tooltip-inner");
  await expect(tooltip).toBeVisible();
  await expect(tooltip).toHaveText("You hovered over the Button");
});
