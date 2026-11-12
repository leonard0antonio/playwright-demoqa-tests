import { test, expect } from "@playwright/test";

// 3. CLICKS AVANÇADOS (Duplo clique e Botão Direito)
test("Deve realizar duplo clique e clique com o botão direito", async ({
  page,
}) => {
  await page.goto("https://demoqa.com/buttons");

  // Duplo Clique
  const btnDuplo = page.locator("#doubleClickBtn");
  await btnDuplo.scrollIntoViewIfNeeded();
  await btnDuplo.dblclick();
  await expect(page.locator("#doubleClickMessage")).toHaveText(
    "You have done a double click",
  );

  // Botão Direito (Context Click)
  const btnDireito = page.locator("#rightClickBtn");
  await btnDireito.click({ button: "right" });
  await expect(page.locator("#rightClickMessage")).toHaveText(
    "You have done a right click",
  );
});
