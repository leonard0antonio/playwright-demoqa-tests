const { chromium } = require('@playwright/test');

const trunc = (s, n = 1500) => (s && s.length > n ? s.slice(0, n) + '...' : s);

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // ---------- 1. WEBTABLES ----------
  console.log('========== WEBTABLES ==========');
  await page.goto('https://demoqa.com/webtables', { waitUntil: 'domcontentloaded' });
  await page.locator('#addNewRecordButton').waitFor({ state: 'visible', timeout: 15000 });
  await page.locator('#addNewRecordButton').click();
  await page.locator('#firstName').waitFor({ state: 'visible', timeout: 10000 });
  await page.locator('#firstName').fill('Bruce');
  await page.locator('#lastName').fill('Wayne');
  await page.locator('#userEmail').fill('batman@gotham.com');
  await page.locator('#age').fill('35');
  await page.locator('#salary').fill('1000000');
  await page.locator('#department').fill('Vigilancia');
  await page.locator('#submit').scrollIntoViewIfNeeded();
  await page.locator('#submit').click();
  await page.locator('#firstName').waitFor({ state: 'hidden', timeout: 10000 });
  await page.locator('#searchBox').pressSequentially('Bruce', { delay: 50 });
  await page.waitForTimeout(1500);

  const wt = await page.evaluate(() => {
    const table = document.querySelector('table');
    const rows = [...document.querySelectorAll('tr')].map((r) => r.innerText.replace(/\n/g, ' | '));
    const noData = [...document.querySelectorAll('div, span, p')].filter((e) =>
      /no rows|no data|nenhuma|found/i.test(e.innerText || '') && e.children.length === 0
    ).map((e) => ({ tag: e.tagName, cls: e.className, text: e.innerText }));
    return {
      tableHTML: table ? table.outerHTML.slice(0, 1200) : 'NO TABLE',
      rows,
      noData,
      hasRtClasses: document.body.innerHTML.includes('rt-td') || document.body.innerHTML.includes('rt-tbody'),
    };
  });
  console.log('tableHTML:', trunc(wt.tableHTML, 1200));
  console.log('rows:', JSON.stringify(wt.rows));
  console.log('noData:', JSON.stringify(wt.noData));
  console.log('hasRtClasses:', wt.hasRtClasses);

  // delete flow: find delete button in the row
  const del = await page.evaluate(() => {
    const row = [...document.querySelectorAll('tr')].find((r) => (r.innerText || '').includes('Bruce'));
    if (!row) return 'ROW NOT FOUND';
    const btn = [...row.querySelectorAll('span[title], button, [id*="delete"], svg')].map((e) => ({
      tag: e.tagName, id: e.id, title: e.getAttribute('title'), cls: e.className, html: e.outerHTML.slice(0, 120),
    }));
    return btn;
  });
  console.log('delete candidates:', JSON.stringify(del, null, 1));

  // ---------- 2. SELECT MENU (multi) ----------
  console.log('\n========== SELECT MENU ==========');
  await page.goto('https://demoqa.com/select-menu', { waitUntil: 'domcontentloaded' });
  const input = page.locator('#react-select-4-input');
  await input.waitFor({ state: 'visible', timeout: 15000 });
  await input.scrollIntoViewIfNeeded();
  await input.click();
  await page.keyboard.type('Green');
  await page.keyboard.press('Enter');
  await page.keyboard.type('Black');
  await page.keyboard.press('Enter');
  await page.waitForTimeout(500);

  const sm = await page.evaluate(() => {
    const inp = document.querySelector('#react-select-4-input');
    if (!inp) return { error: 'input not found' };
    // walk up to the react-select container
    let el = inp;
    const chain = [];
    for (let i = 0; i < 6 && el; i++) {
      el = el.parentElement;
      if (!el) break;
      chain.push({ tag: el.tagName, id: el.id, cls: (el.className || '').toString().slice(0, 80) });
    }
    const container = el;
    return {
      chain,
      containerHTML: container ? container.outerHTML.slice(0, 1500) : 'none',
      allReactSelectIds: [...document.querySelectorAll('[id^="react-select"]')].map((e) => e.id),
    };
  });
  console.log('chain:', JSON.stringify(sm.chain, null, 1));
  console.log('containerHTML:', trunc(sm.containerHTML, 1500));
  console.log('allReactSelectIds:', JSON.stringify(sm.allReactSelectIds));

  // ---------- 3. ACCORDIAN ----------
  console.log('\n========== ACCORDIAN ==========');
  await page.goto('https://demoqa.com/accordian', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2500);
  const ac = await page.evaluate(() => {
    const headings = [...document.querySelectorAll('.card, [class*="accordion"], h1, h2, h3, h4, h5, button, div')]
      .filter((e) => /section|heading|accordion|card/i.test((e.id || '') + ' ' + (e.className || '')))
      .slice(0, 25)
      .map((e) => ({ tag: e.tagName, id: e.id, cls: (e.className || '').toString().slice(0, 90), text: (e.innerText || '').slice(0, 60) }));
    return {
      headings,
      hasSection2Heading: !!document.querySelector('#section2Heading'),
      hasSection2Content: !!document.querySelector('#section2Content'),
      bodySample: document.querySelector('#app') ? document.querySelector('#app').innerHTML.slice(0, 800) : 'no #app',
    };
  });
  console.log('headings:', JSON.stringify(ac.headings, null, 1));
  console.log('hasSection2Heading:', ac.hasSection2Heading, '| hasSection2Content:', ac.hasSection2Content);
  console.log('bodySample:', trunc(ac.bodySample, 800));

  await browser.close();
})().catch((e) => {
  console.error('DEBUG SCRIPT ERROR:', e);
  process.exit(1);
});
