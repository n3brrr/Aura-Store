import { test, expect } from '@playwright/test';
import { expectHydrated } from './helpers/hydration';

test.describe('home page', () => {
  test('renders the main sections without page errors', async ({ page }) => {
    const pageErrors: string[] = [];
    page.on('pageerror', (error) => pageErrors.push(error.message));

    await page.goto('/');

    await expect(page.locator('#hero')).toBeVisible();
    await expect(page.locator('#shop')).toBeVisible();
    await expect(page.locator('#custom')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();

    expect(pageErrors).toEqual([]);
  });

  // Fixme: the Hero component in src/pages/index.astro has no client:* directive,
  // so its onClick never hydrates and the button does nothing. Add client:load to
  // <Hero /> to fix it, then change test.fixme to test.
  test.fixme('New Collection button opens the coming soon page', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: 'New Collection' }).click();

    await expect(page).toHaveURL(/\/ComingSoon/);
  });

  test('a product card opens the coming soon page', async ({ page }) => {
    await page.goto('/');

    const card = page.locator('#shop article').first();
    await expectHydrated(card);

    await card.click();

    await expect(page).toHaveURL(/\/ComingSoon/);
  });

  test('desktop navbar scrolls to the custom section', async ({ page, isMobile }) => {
    test.skip(isMobile, 'the desktop navbar is hidden below the md breakpoint');
    await page.goto('/');

    await page.getByRole('navigation').getByRole('link', { name: 'Custom' }).click();

    await expect(page.locator('#custom')).toBeInViewport();
  });

  test('mobile menu opens, closes and navigates to a section', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'the mobile menu only exists below the md breakpoint');
    await page.goto('/');

    const menu = page.getByRole('dialog', { name: 'Navigation menu' });
    const openMenu = page.getByRole('button', { name: 'Open menu' });
    await expectHydrated(openMenu);

    await openMenu.click();
    await expect(menu).toBeVisible();

    await page.getByRole('button', { name: 'Close menu' }).click();
    await expect(menu).toBeHidden();

    await page.getByRole('button', { name: 'Open menu' }).click();
    await menu.getByRole('link', { name: 'Custom' }).click();

    await expect(menu).toBeHidden();
    await expect(page.locator('#custom')).toBeInViewport();
  });

  test('does not scroll horizontally', async ({ page }) => {
    await page.goto('/');

    const hasHorizontalScroll = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth,
    );

    expect(hasHorizontalScroll).toBe(false);
  });
});
