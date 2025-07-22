import { test, expect } from '@playwright/test'
import { faker } from '@faker-js/faker'
import { deleteTask } from './helper'

test.beforeEach(async ({ page }) => {
  await page.goto('http://127.0.0.1:8080')
})

test('Deve poder cadastrar duas tarefas', async ({ page }) => {
    await page.fill('#newTask', 'Ler um livro')
    await page.keyboard.press('Enter')
    await expect(page.locator('text=Ler um livro')).toBeVisible()
    await page.fill('#newTask', faker.lorem.words())
    await page.keyboard.press('Enter')
    await page.waitForTimeout(3000)
});

test('Selecionando a task', async ({ page }) => {
    await page.locator('button._listItemToggle_1kgm5_16').first().click()
    const contador = page.locator('span', { hasText: '1 of 2' })
    await expect(contador).toHaveText('1 of 2')
});

test('Não deve permitir tarefa duplicada', async ({ page }) => { // task already existis
    await page.fill('#newTask', 'Ler um livro')
    await page.keyboard.press('Enter')
    const popup = page.locator('.swal2-html-container')
    await expect(popup).toBeVisible()
    await expect(popup).toHaveText('Task already exists!')
});

test('Deletando a task "Ler um livro"', async ({ page }) => {
  await expect(page.locator('text=Ler um livro')).toBeVisible()
  await deleteTask(page)
  // Verifica que sumiu
  await expect(page.locator('text=Ler um livro')).toHaveCount(0)
})

test('Deletando a task lorem', async ({ page }) => {
  await deleteTask(page)
})

test('Validando mensagem de preenchimento de campo obrigatório', async ({ page }) => {
  await page.click('button._listButtonNewTask_1y0mp_40');
  const validationMessage = await page.$eval('#newTask', el => (el as HTMLInputElement).validationMessage);
  expect(validationMessage).toEqual('This is a required field')
})



