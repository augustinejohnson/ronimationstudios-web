import { test, expect } from '@playwright/test';

test('homepage has title and hero section', async ({ page }) => {
    await page.goto('/');

    // Expect a title "Ronimation Studios" or similar
    await expect(page).toHaveTitle(/Ronimation/);

    // Check for hero text
    await expect(page.getByText('Visualizing Sound')).toBeVisible();

    // Check for navigation
    await expect(page.getByRole('link', { name: 'Ecosystem' })).toBeVisible();
});

test('can navigate to services via ecosystem', async ({ page }) => {
    await page.goto('/');
    // Scroll to Ecosystem
    await page.getByRole('link', { name: 'Ecosystem' }).click();
    // Click on a service card (e.g., Audio & Music)
    await page.getByRole('heading', { name: 'Audio & Music' }).click();

    // Should navigate to /services/audio-music
    await expect(page).toHaveURL(/.*\/services\/audio-music/);
    await expect(page.getByRole('heading', { name: 'Audio & Music' })).toBeVisible();
});
