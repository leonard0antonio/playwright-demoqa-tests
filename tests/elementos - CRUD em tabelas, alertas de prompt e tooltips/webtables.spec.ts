import { test, expect } from "@playwright/test";

//WEB TABLES (Tabelas de Dados Dinâmicas)
test("Deve adicionar, buscar e deletar um registro na tabela", async ({
  page,
}) => {
  await page.goto("https://demoqa.com/webtables");

  // Passo A: Adicionar novo registro
  await page.locator("#addNewRecordButton").click();

  // O modal de cadastro abre com animação; aguarda ficar visível antes de preencher
  // para evitar race condition com o preenchimento dos campos
  await page.locator("#firstName").waitFor({ state: "visible" });

  await page.locator("#firstName").fill("Bruce");
  await page.locator("#lastName").fill("Wayne");
  await page.locator("#userEmail").fill("batman@gotham.com");
  await page.locator("#age").fill("35");
  await page.locator("#salary").fill("1000000");
  await page.locator("#department").fill("Vigilância");

  // O botão submit pode ficar coberto por rodapé/anúncios; garante que esteja visível antes de clicar
  await page.locator("#submit").scrollIntoViewIfNeeded();
  await page.locator("#submit").click();

  // Aguarda o modal fechar após o submit
  await page.locator("#firstName").waitFor({ state: "hidden" });

  // Passo B: Buscar o registro criado (A tabela filtra dinamicamente)
  const barraBusca = page.locator("#searchBox");
  await barraBusca.pressSequentially("Bruce", { delay: 100 });

  // Aguarda o filtro ser aplicado e o registro aparecer na tabela
  // O DemoQA migrou de Reactable para uma tabela HTML simples: o corpo é um <tbody> puro
  const corpoTabela = page.locator("table tbody");
  await expect(corpoTabela).toContainText("batman@gotham.com");

  // Passo C: Deletar o registro
  // Como buscamos por 'Bruce', ele deve ser a primeira linha visível (índice 0)
  const botaoDeletar = page.locator('span[title="Delete"]').first();
  await botaoDeletar.click();

  // Validamos se a tabela ficou vazia após a deleção.
  // A tabela atual não renderiza mensagem de "sem dados": o <tbody> fica sem nenhuma linha
  await expect(page.locator("table tbody tr")).toHaveCount(0);
});
