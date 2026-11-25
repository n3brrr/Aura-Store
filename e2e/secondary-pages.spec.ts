import { test, expect } from '@playwright/test';
import { expectHydrated } from './helpers/hydration';

test.describe('secondary pages', () => {
  test('coming soon page returns to the home page', async ({ page }) => {
    await page.goto('/ComingSoon');
    const returnButton = page.getByRole('button', { name: 'Return to home' });
    await expectHydrated(returnButton);

    await returnButton.click();

    await expect(page).toHaveURL(/\/$/);
  });

  test('unknown routes render the 404 page', async ({ page }) => {
    const response = await page.goto('/this-page-does-not-exist');

    expect(response?.status()).toBe(404);
    await expect(page.getByText('Status: Error_Not_Found')).toBeVisible();
  });

  test('the 404 page links back to the home page', async ({ page }) => {
    await page.goto('/this-page-does-not-exist');

    await page.getByRole('link', { name: /Restore Session/ }).click();

    await expect(page).toHaveURL(/\/$/);
  });
});
