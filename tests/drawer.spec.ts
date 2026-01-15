import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.clear();
    sessionStorage.clear();
  });
});

test.describe('Drawer Behavior', () => {
  test('should toggle drawer on desktop', async ({ page }) => {
    await page.goto('/');
    
    const drawer = page.locator('aside');
    // Based on logic, drawer should be open by default on desktop for home
    await expect(drawer).toHaveClass(/translate-x-0/);

    // Click toggle button in header
    await page.getByLabel('Toggle menu').click();
    await expect(drawer).toHaveClass(/-translate-x-full/);

    // Click again to open
    await page.getByLabel('Toggle menu').click();
    await expect(drawer).toHaveClass(/translate-x-0/);
  });

  test('should show different content for different routes', async ({ page }) => {
    await page.goto('/systems');
    await expect(page.getByText('LAAS — Logistics as a Service')).toBeVisible();

    await page.goto('/contact');
    await expect(page.getByText('Contact Info')).toBeVisible();
  });
});

test.describe('Mobile View', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test('should have drawer closed by default', async ({ page }) => {
    await page.goto('/');
    const drawer = page.locator('aside');
    await expect(drawer).toHaveClass(/-translate-x-full/);
  });

  test('should open drawer and close on navigation', async ({ page }) => {
    await page.goto('/systems');
    
    // Open drawer
    await page.getByLabel('Toggle menu').click();
    const drawer = page.locator('aside');
    await expect(drawer).toHaveClass(/translate-x-0/);

    // Click an item
    await page.getByRole('link', { name: 'LAAS — Logistics as a Service' }).click();

    // Drawer should close on mobile after click
    await expect(drawer).toHaveClass(/-translate-x-full/);
  });
});

test.describe('Section Scrolling', () => {
  test('should scroll to section when clicking drawer item', async ({ page }) => {
    await page.goto('/systems');
    
    // Get the target element
    const target = page.locator('#system-twin-v2-wms');
    
    // Click the link in drawer
    await page.getByRole('link', { name: 'Twin V2 — WMS' }).click();

    // Check if element is in viewport
    await expect(target).toBeInViewport();
  });
});
