import type { Page } from '@playwright/test'

export async function deleteTask(page: Page, taskText?: string) {
  if (taskText) {
    // Deleta a task que contém o texto exato
    await page.locator(`li:has-text("${taskText}") button._listItemDeleteButton_1kgm5_52`).click()
  } else {
    // Deleta a primeira task da lista
    await page.locator('button._listItemDeleteButton_1kgm5_52').first().click()
  }
};