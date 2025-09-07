import { test, expect } from '@playwright/test';

test('quick add flow', async ({ page }) => {
  await page.goto('http://localhost:5173');
  await page.fill('input[placeholder="Quick add"]', 'smoke task');
  await page.press('input[placeholder="Quick add"]', 'Enter');
  await expect(page.locator('li', { hasText: 'smoke task' })).toBeVisible();
});
