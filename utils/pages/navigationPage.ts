import { Page } from "@playwright/test";
import { config } from "../config";


export class NavigationPage{
    page: Page;
    constructor(page: Page){
        this.page = page;
    }

    async loginPage(){
        await this.page.goto(config.urlLogin);
        await this.page.waitForSelector('button');
    }

    async addCategory(){
        await this.page.getByRole('link', { name: 'kategori' }).click();
        await this.page.getByRole('link', { name: 'tambah' }).click();
    }

    async reloadPage(){
        await this.page.reload();
        await this.page.waitForLoadState('networkidle');
    }

    async deleteActionCategory(){
        await this.page.locator('[aria-haspopup="menu"]').filter({has: this.page.locator('[data-icon="ellipsis-v"]')}).click();
        await this.page.locator('[role="menu"]').filter({hasText: "hapus"}).click();
        await this.page.getByRole('button', { name: 'Delete' }).click();
        await this.page.waitForLoadState('networkidle');
    }
}