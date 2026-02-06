import { test, expect } from '@playwright/test';

test('contact form validation', async ({ page }) => {
    await page.goto('/contact');

    // Try to submit empty form
    await page.getByRole('button', { name: 'Send Message' }).click();

    // Expect validation errors (Sonner toast or error class)
    // Since we rely on Toasts, we check for the text in the toast
    await expect(page.getByText('Validation failed')).toBeVisible();
});

test.skip('contact form submission (simulated)', async ({ page }) => {
    // Test skipped to avoid spamming the real Resend API during dev unless mocked
    await page.goto('/contact');

    await page.getByPlaceholder('John').fill('Playwright');
    await page.getByPlaceholder('Doe').fill('Tester');
    await page.getByPlaceholder('john@example.com').fill('test@playwright.dev');
    await page.getByPlaceholder('Tell us about your project...').fill('This is an automated test message from Playwright.');

    await page.getByRole('button', { name: 'Send Message' }).click();

    await expect(page.getByText('Message sent successfully')).toBeVisible();
});
