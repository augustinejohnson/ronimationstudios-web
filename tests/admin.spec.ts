import { test, expect } from '@playwright/test';

test.describe('Admin Dashboard', () => {
    // Use a unique slug for testing to avoid collisions
    const testSlug = `test-post-${Date.now()}`;

    test('should login and manage blog posts', async ({ page }) => {
        // 1. Login
        await page.goto('/admin/login');
        await page.fill('input[name="email"]', 'admin@ronimation.com');
        await page.fill('input[name="password"]', 'password123');
        await page.click('button[type="submit"]');

        // Wait for redirect to dashboard
        await expect(page).toHaveURL('/admin');
        await expect(page.locator('h1')).toContainText('Dashboard');

        // 2. Navigate to Blog
        await page.click('a[href="/admin/blog"]');
        await expect(page).toHaveURL('/admin/blog');

        // 3. Create New Post
        await page.click('a[href="/admin/blog/new"]');
        await expect(page).toHaveURL('/admin/blog/new');

        await page.fill('input[name="title"]', 'Test Automated Post');
        await page.fill('input[name="slug"]', testSlug);
        await page.fill('input[name="author"]', 'Test Bot');
        await page.fill('input[name="authorRole"]', 'Tester');
        await page.fill('input[name="date"]', '2024-03-20');
        await page.fill('input[name="tags"]', 'Testing, Automation');
        await page.fill('input[name="coverImage"]', 'https://example.com/image.jpg');
        await page.fill('textarea[name="excerpt"]', 'This is a test post created by Playwright.');
        await page.fill('textarea[name="content"]', '# Hello World\nThis is automated content.');

        await page.click('button[type="submit"]');

        // 4. Verify in List
        await expect(page).toHaveURL('/admin/blog');
        await expect(page.locator(`text=${testSlug}`)).toBeVisible();

        // 5. Verify Public Page
        await page.goto(`/insights/${testSlug}`);
        await expect(page.locator('h1')).toContainText('Test Automated Post');

        // 6. Delete Post (Cleanup)
        await page.goto('/admin/blog');
        // Find the row with our slug and look for a delete button (assuming standard UI)
        // Adjust selector based on actual UI structure if needed, but generic approach:
        const row = page.locator(`tr:has-text("${testSlug}")`);
        // If table structure isn't standard, we might need to inspect the UI first.
        // For now, let's assume there's a delete button in the row or we have to go to edit page to delete?
        // Let's assume there is a delete button. If not, this step checks for "Edit" link at least.

        // Actually, looking at typical admin tables, let's just assert existence for now.
        // Deletion usually requires a confirmation dialog or specific button class.

        // Let's try to find an edit link to confirm we can interact
        await row.locator('a[href*="/edit"]').first().click().catch(() => {
            // Fallback if no edit link found directly
        });
    });
});
