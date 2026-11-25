import type { Page } from '@playwright/test';
import { expectHydrated } from './hydration';

/**
 * Drags the footer cut line past its limit, which opens the halt modal.
 *
 * The slider is a pointer-driven motion element with no keyboard handler, so
 * the drag is done with the mouse. The distance is the container width, which
 * is always larger than the 90% limit; the element clamps at that limit.
 */
export async function dragCutLineToEnd(page: Page): Promise<void> {
  const slider = page.getByRole('slider', { name: 'Drag to cut' });
  await expectHydrated(slider);
  await slider.scrollIntoViewIfNeeded();

  const box = await slider.boundingBox();
  if (!box) throw new Error('Cut line slider is not visible');

  const trackWidth = await slider.evaluate(
    (el) => (el.parentElement as HTMLElement).clientWidth,
  );

  const startX = box.x + box.width / 2;
  const y = box.y + box.height / 2;

  await page.mouse.move(startX, y);
  await page.mouse.down();
  await page.mouse.move(startX + trackWidth, y, { steps: 25 });
  await page.mouse.up();
}
