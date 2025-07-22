import { test, expect } from '@playwright/test';

test('Web app deve estar online', async ({ page }) => {
    await page.goto('http://127.0.0.1:8080')
    await expect(page).toHaveTitle("Gerencie suas tarefas com Mark L")
    await page.waitForTimeout(4000)
})