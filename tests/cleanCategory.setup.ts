import { test as setup, expect } from '@playwright/test';
import { PageManager } from '../utils/page';
import { config } from '../utils/config';

setup('clean Category', async ({ page }) => {
    const pm = new PageManager (page);
    await pm.navigateTo().loginPage();
    await pm.fillFormLayoutsPage().submitCredentialLogin(config.usernameAdmin, config.passwordAdmin);
    await page.getByRole('link', { name: 'kategori' }).click();
    await pm.fillFormLayoutsPage().searchCategory('Add');
    await pm.navigateTo().deleteActionCategory();

    await pm.fillFormLayoutsPage().searchCategory('Edit');
    await pm.navigateTo().deleteActionCategory();

    // Assert that it contains no rows
    const tableBody = page.locator('table.chakra-table tbody');
    await expect(tableBody.locator('tr')).toHaveCount(0);
});