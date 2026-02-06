import { test, expect } from '@playwright/test';

test.describe('Work Section', () => {
    test('should navigate to work page and display projects', async ({ page }) => {
        await page.goto('/work');

        // Check header
        await expect(page.getByRole('heading', { name: 'Selected Work' })).toBeVisible();

        // Check filter buttons
        await expect(page.getByRole('button', { name: 'All' })).toBeVisible();
        await expect(page.getByRole('button', { name: 'Audio' })).toBeVisible();

        // Check project cards exist
        const projects = page.locator('a[href^="/work/"]');
        await expect(projects.first()).toBeVisible();
    });

    test('should filter projects', async ({ page }) => {
        await page.goto('/work');

        // Click Audio filter
        await page.getByRole('button', { name: 'Audio' }).click();

        // Verify audio project is visible (e.g. XYZ Corp)
        await expect(page.getByText('XYZ Corp Sonic Branding')).toBeVisible();

        // Verify visual project is NOT visible (e.g. Neon Dreams)
        // detailed check depends on if we hide or remove elements. The code filters the array, so it should be removed.
        await expect(page.getByText('Neon Dreams')).not.toBeVisible();
    });

    test('should navigate to project detail page', async ({ page }) => {
        await page.goto('/work');

        // Click first project
        await page.locator('a[href^="/work/"]').first().click();

        // Verify detail page content
        await expect(page.getByText('About the Project')).toBeVisible();
        await expect(page.getByText('Technologies')).toBeVisible();
    });
});
