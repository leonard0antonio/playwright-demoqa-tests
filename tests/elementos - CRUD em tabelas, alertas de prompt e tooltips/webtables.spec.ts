import { test, expect } from "@playwright/test";

//WEB TABLES (Tabelas de Dados Dinâmicas)
test("Deve adicionar, buscar e deletar um registro na tabela", async ({
  page,
}) => {
  await page.goto("https://demoqa.com/webtables");

  // Passo A: Adicionar novo registro
  await page.locator("#addNewRecordButton").click();
  await page.locator("#firstName").fill("Bruce");
  await page.locator("#lastName").fill("Wayne");
  await page.locator("#userEmail").fill("batman@gotham.com");
  await page.locator("#age").fill("35");
  await page.locator("#salary").fill("1000000");
  await page.locator("#department").fill("Vigilância");
  await page.locator("#submit").click();

  // Passo B: Buscar o registro criado (A tabela filtra dinamicamente)
  const barraBusca = page.locator("#searchBox");
  await barraBusca.fill("Bruce");

  // Validamos se o e-mail que acabamos de cadastrar está visível na tabela filtrada
  const corpoTabela = page.locator(".rt-tbody");
  await expect(corpoTabela).toContainText("batman@gotham.com");

  // Passo C: Deletar o registro
  // Como buscamos por 'Bruce', ele deve ser a primeira linha visível (índice 0)
  const botaoDeletar = page.locator('span[title="Delete"]').first();
  await botaoDeletar.click();

  // Validamos se a tabela ficou vazia após a deleção
  await expect(page.locator(".rt-noData")).toBeVisible();
});
