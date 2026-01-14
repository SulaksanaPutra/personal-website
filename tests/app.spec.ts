import { test, expect } from '@playwright/test';

test('homepage has title and about section', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/Bayu Aksana/);

  // Check for about section which is the default on homepage
  await expect(page.locator('div#section-about')).toBeVisible();
});

test('should navigate to the systems page', async ({ page }) => {
  await page.goto('/');

  // Click the Systems link in the navigation
  await page.click('nav a:has-text("Systems")');

  await expect(page).toHaveURL('/systems');
  
  // Wait for content to load
  await expect(page.locator('article').first()).toBeVisible();
});

test('should toggle theme', async ({ page }) => {
  await page.goto('/');

  const html = page.locator('html');
  const isDarkInitially = await html.getAttribute('class').then(c => c?.includes('dark'));

  await page.getByLabel('Toggle theme').click();

  if (isDarkInitially) {
    await expect(html).not.toHaveClass(/dark/);
  } else {
    await expect(html).toHaveClass(/dark/);
  }
});
