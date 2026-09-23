import { Page, Locator } from '@playwright/test';

export class LoginPage {

  private page: Page;
  public login: Locator;
  public password: Locator;

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.login = page.locator('css=#form-login');
    this.password = page.locator('css=#form-password');
  }


}