import { test, expect } from '@playwright/test';

test('service page renders correctly', async ({ page }) => {
    await page.goto('/services/gen-ai');

    await expect(page.getByRole('heading', { name: 'Generative AI' })).toBeVisible();

    // Check for features
    await expect(page.getByText('Use AI to create visuals')).toBeVisible();

    // Check metadata (title)
    await expect(page).toHaveTitle(/Generative AI/);
});
