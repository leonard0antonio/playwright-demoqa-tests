import { test, expect } from '@playwright/test';

// 4. DATE PICKER (Calendário)
  test('Deve selecionar uma data específica no calendário', async ({ page }) => {
    await page.goto('https://demoqa.com/date-picker');

    const inputData = page.locator('#datePickerMonthYearInput');
    
    // Forma 1: Digitar diretamente no input (mais rápido e seguro se o sistema permitir)
    // O DemoQA requer um "Enter" após preencher para fixar a data
    await inputData.fill('10/15/2025');
    await page.keyboard.press('Enter');
    await expect(inputData).toHaveValue('10/15/2025');

    // Forma 2: Interagir navegando no calendário visualmente
    await inputData.click();
    await page.locator('.react-datepicker__month-select').selectOption('5'); // Junho (índice 5)
    await page.locator('.react-datepicker__year-select').selectOption('2026');
    
    // Escolhe o dia 20 verificando qual não está cinza (fora do mês atual)
    await page.locator('.react-datepicker__day--020:not(.react-datepicker__day--outside-month)').click();
    
    await expect(inputData).toHaveValue('06/20/2026');
  });