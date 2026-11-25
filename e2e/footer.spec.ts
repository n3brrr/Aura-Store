import { test, expect } from '@playwright/test';
import { dragCutLineToEnd } from './helpers/cut-line';
import { expectHydrated } from './helpers/hydration';

test.describe('footer cut line', () => {
  test('dragging the cut line moves the slider', async ({ page }) => {
    await page.goto('/');
    const slider = page.getByRole('slider', { name: 'Drag to cut' });
    await expectHydrated(slider);

    await slider.scrollIntoViewIfNeeded();
    const box = await slider.boundingBox();
    if (!box) throw new Error('Cut line slider is not visible');
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.mouse.down();
    await page.mouse.move(box.x + box.width / 2 + 200, box.y + box.height / 2, {
      steps: 20,
    });
    await page.mouse.up();

    await expect
      .poll(async () => Number(await slider.getAttribute('aria-valuenow')))
      .toBeGreaterThan(0);
  });

  test('dragging the cut line past its limit opens the halt modal', async ({ page }) => {
    await page.goto('/');

    await dragCutLineToEnd(page);

    await expect(
      page.getByLabel('Why do you want to cut with Aura Store?'),
    ).toBeVisible();
  });

  test('the halt modal accepts a reason', async ({ page }) => {
    await page.goto('/');
    await dragCutLineToEnd(page);

    const reason = page.getByLabel('Why do you want to cut with Aura Store?');
    await reason.fill('Too many emails');

    await expect(reason).toHaveValue('Too many emails');
  });

  test('aborting the halt modal closes it and resets the cut line', async ({ page }) => {
    await page.goto('/');
    await dragCutLineToEnd(page);

    await page.getByRole('button', { name: 'ABORT — STAY WITH US' }).click();

    await expect(
      page.getByLabel('Why do you want to cut with Aura Store?'),
    ).toHaveCount(0);
    await expect(page.getByRole('slider', { name: 'Drag to cut' })).toHaveAttribute(
      'aria-valuenow',
      '0',
    );
  });

  test('footer link checkboxes can be selected and cleared', async ({ page }) => {
    await page.goto('/');
    const checkbox = page.getByRole('checkbox', { name: 'Select Shop' });
    await expectHydrated(checkbox);

    await checkbox.check();
    await expect(checkbox).toBeChecked();

    await checkbox.uncheck();
    await expect(checkbox).not.toBeChecked();
  });
});
