import { test, expect } from '@playwright/test';

test.describe('Admin Flow', () => {
    test.use({ storageState: { cookies: [], origins: [] } }); // Ensure no session

    test('should login successfully', async ({ page }) => {
        await page.goto('/admin/login');

        // Fill credentials (using the seeded ones)
        await page.fill('input[name="email"]', 'admin@ronimationstudios.com');
        await page.fill('input[name="password"]', 'Admin123!');

        await page.click('button[type="submit"]');

        // Wait for navigation
        await expect(page).toHaveURL(/\/admin/);

        // Perform a quick check for dashboard element/text
        await expect(page.getByText('Admin Dashboard')).toBeVisible({ timeout: 10000 }).catch(() => {
            // If explicit text not found, check for Logout button which implies logged in state
            return expect(page.getByText('Logout')).toBeVisible();
        });
    });

    test('should manage team members', async ({ page }) => {
        // Login first
        await page.goto('/admin/login');
        await page.fill('input[name="email"]', 'admin@ronimationstudios.com');
        await page.fill('input[name="password"]', 'Admin123!');
        await page.click('button[type="submit"]');
        await expect(page).toHaveURL(/\/admin/);

        // Navigate to Team section
        await page.goto('/admin/team');

        // Add new member
        await page.getByRole('link', { name: 'Add Member' }).click();
        await page.fill('input[name="name"]', 'Playwright Test User');
        await page.fill('input[name="role"]', 'Tester');

        // Submit
        await page.click('button[type="submit"]');

        // Verify in list
        await expect(page.getByText('Playwright Test User')).toBeVisible();

        // Cleanup: Delete member (if delete button exists and is accessible)
        // For now, just verifying creation is good progress.
    });
});
