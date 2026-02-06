import { test, expect } from '@playwright/test';

test.describe('Insights Section', () => {
    test('should navigate to insights page and display posts', async ({ page }) => {
        await page.goto('/insights');

        // Check header
        await expect(page.getByRole('heading', { name: 'Insights' })).toBeVisible();

        // Check at least one post exists
        const posts = page.locator('a[href^="/insights/"]');
        await expect(posts.first()).toBeVisible();
    });

    test('should navigate to blog post detail', async ({ page }) => {
        await page.goto('/insights');

        // Click first post
        await page.locator('a[href^="/insights/"]').first().click();

        // Verify post content
        await expect(page.getByRole('article')).toBeVisible();
        await expect(page.getByText('Keep Reading')).toBeVisible();
    });

    test('should have sitemap', async ({ request }) => {
        const sitemap = await request.get('/sitemap.xml');
        expect(sitemap.ok()).toBeTruthy();
        const text = await sitemap.text();
        expect(text).toContain('items/insights');
    });
});
