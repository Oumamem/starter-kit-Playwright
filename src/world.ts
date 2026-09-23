import { setWorldConstructor, World } from '@cucumber/cucumber';
import * as Playwright from 'playwright';

class CustomWorld extends World {
    public page: any;

    async openUrl(url: any) {
        const browser = await Playwright.chromium.launch({
            headless: false,
        });
        const context = await browser.newContext();
        this.page = await context.newPage();
        await this.page.goto(url);
    }
}

setWorldConstructor(CustomWorld);