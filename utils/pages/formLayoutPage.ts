import { Page } from "@playwright/test";

export class FormLayoutPage {
    page: Page;
    constructor(page: Page){
        this.page = page;
    }

    async submitCredentialLogin(email: string, password: string): Promise<void> {
        await this.page.getByPlaceholder('email').fill(email);
        await this.page.getByPlaceholder('password').fill(password);
        await this.page.getByRole('button', { name: 'login' }).click();
    }

    async createNewProduct(name: string, description: string): Promise<void> {
        await this.page.locator('#nama').fill(name);
        await this.page.locator('#deskripsi').fill(description);
        await this.page.getByRole('button', { name: 'simpan' }).click();
        await this.page.waitForTimeout(1500);

    }

    async searchCategory(name: string): Promise<void> {
        await this.page.getByPlaceholder('cari').fill(name);
        await this.page.waitForTimeout(3000);
    }
}