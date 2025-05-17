import { expect, test} from '@playwright/test';
import { PageManager } from '../utils/page';
import { config } from '../utils/config';

test.beforeEach(async({page}) => {
    const pm = new PageManager (page);
    await pm.navigateTo().loginPage();
    await pm.fillFormLayoutsPage().submitCredentialLogin(config.usernameAdmin, config.passwordAdmin);
});

test.describe('Scenario Category Feature', () => {
    test('Failed Add Category @negative', async ({ page }) => {
        const pm = new PageManager (page);
        await pm.navigateTo().addCategory();
        await expect(page.getByText('dashboard / kategori / baru')).toBeVisible();
        await page.getByRole('button', { name: 'simpan' }).click();
        // assertion
        await expect(page.locator('[role="alert"]')).toHaveText('"name" is not allowed to be empty');
        await page.screenshot({ path: 'screenshots/categoryfailedadd.png', fullPage: true });
    });

    test('Succeed Add Category @positive', async ({ page }) => {
        const pm = new PageManager (page);
        await pm.navigateTo().addCategory();
        await pm.fillFormLayoutsPage().createNewProduct('Add', 'Add Category Description');
        // assertion
        await expect(page.locator('[role="alert"]').filter({hasText:'success'})).toBeVisible();
        await expect(page.locator('[role="alert"]').filter({hasText:'item ditambahkan'})).toBeVisible();
        await pm.navigateTo().reloadPage();
        await page.screenshot({ path: 'screenshots/categorysuccedadd.png', fullPage: true });
    });

    test('Failed Edit Category @negative', async ({ page }) => {
        const pm = new PageManager (page);
        await pm.navigateTo().addCategory();
        await pm.fillFormLayoutsPage().createNewProduct('Edit', 'Edit Description');
        await pm.fillFormLayoutsPage().searchCategory('Edit');
        await page.locator('[aria-haspopup="menu"]').filter({has: page.locator('[data-icon="ellipsis-v"]')}).click();
        await page.locator('[role="menuitem"]').filter({hasText: "ubah"}).click();
        await expect(page.getByText('dashboard / kategori / ubah')).toBeVisible();
        await pm.navigateTo().reloadPage();
        await pm.fillFormLayoutsPage().createNewProduct('', '');
        // assertion
        await expect(page.locator('[role="alert"]')).toHaveText('"name" is not allowed to be empty');
        await page.screenshot({ path: 'screenshots/categoryfailededit.png', fullPage: true });
    });

    test('Succeed Delete Category @positive', async ({ page }) => {
        const pm = new PageManager (page);
        await pm.navigateTo().addCategory();
        await pm.fillFormLayoutsPage().createNewProduct('Delete', 'Delete Description');
        await expect(page.locator('[role="alert"]').filter({hasText:'success'})).toBeVisible();
        await page.locator('button[aria-label="Close"]').click();
        await pm.navigateTo().reloadPage();
        await page.screenshot({ path: 'screenshots/categorybeforedelete.png', fullPage: true });

        await pm.fillFormLayoutsPage().searchCategory('Delete');
        await pm.navigateTo().deleteActionCategory();
        // assertion
        await expect(page.locator('[role="alert"]').filter({hasText:'item dihapus'})).toBeVisible();
        await pm.navigateTo().reloadPage();
        await page.screenshot({ path: 'screenshots/categoryafterdelete.png', fullPage: true });
    });
});

test.afterAll(async({page}) => {
    const pm = new PageManager (page);
    await pm.navigateTo().loginPage();
    await pm.fillFormLayoutsPage().submitCredentialLogin(config.usernameAdmin, config.passwordAdmin);
    await page.getByRole('link', { name: 'kategori' }).click();
    await pm.fillFormLayoutsPage().searchCategory('Add');
    await pm.navigateTo().deleteActionCategory();
    await pm.fillFormLayoutsPage().searchCategory('Edit');
    await pm.navigateTo().deleteActionCategory();
});