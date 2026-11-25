import { expect, type Locator } from '@playwright/test';

/**
 * Waits until React has attached its event props to the element.
 *
 * Astro renders the HTML first and React hydrates it afterwards, so a click
 * right after `page.goto()` can land before the onClick handler exists. This
 * waits on the React prop itself, which is more precise than a network-idle wait.
 */
export async function expectHydrated(locator: Locator): Promise<void> {
  await expect
    .poll(() =>
      locator.evaluate((el) =>
        Object.keys(el).some((key) => key.startsWith('__reactProps')),
      ),
    )
    .toBe(true);
}
