import { Page } from "@playwright/test";
import { FormLayoutPage } from "./pages/formLayoutPage";
import { NavigationPage } from "./pages/navigationPage";

export class PageManager {

    private readonly page: Page;
    private readonly navigationPage: NavigationPage;
    private readonly formLayoutPage: FormLayoutPage;

    constructor(page: Page){
        this.page = page;
        this.navigationPage = new NavigationPage(this.page);
        this.formLayoutPage = new FormLayoutPage(this.page);
    }

    navigateTo() {
        return this.navigationPage;
    }

    fillFormLayoutsPage() {
        return this.formLayoutPage;
    }
}