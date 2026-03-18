import { expect, test } from '@playwright/test';

test('set up', async ({ page }) => {
    await page.goto('http://localhost:5174');
    await expect(page.getByTestId('game-form')).toBeVisible();
})