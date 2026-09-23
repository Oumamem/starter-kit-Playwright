import { Page, Locator } from 'playwright/test';

export class HomePage {

  private page: Page;
  public geolocationPopIn: Locator;
  public forceOtherLocation: Locator;
  public cookieDisclaimer: Locator;
  public acceptAllCookies: Locator;
  public notificationsPopIn: Locator;
  public closeNotificationsPopInButton: Locator;
  public fashionAndAccessoriesButton: Locator;
  public getBasketButtonInHeader: Locator;
  public basketButtonInheader: Locator;

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.geolocationPopIn = page.locator('css=.popin__wrapper');
    this.forceOtherLocation = page.locator('css=button[data-end-to-end="geolocationResumeToLocale"]');
    this.cookieDisclaimer = page.locator('css=#onetrust-banner-sdk');
    this.acceptAllCookies = page.locator('#onetrust-accept-btn-handler');
    this.notificationsPopIn = page.locator('.sumome-react-wysiwyg-move-handle');
    this.closeNotificationsPopInButton = page.locator('.sumome-react-svg-image-container #Layer_1');
    this.fashionAndAccessoriesButton = page.locator('(//ul[@role="menu"]//a)[1]');
    this.getBasketButtonInHeader = this.getBasketButtonInHeaderLocator();
    this.basketButtonInheader = page.locator('(//li[@role="tab"]/following-sibling::li)[3]');
  }

  private getBasketButtonInHeaderLocator(): Locator {
    let locator: Locator;

    switch (process.env.NODE_ENV) {
      case "uat":
        locator = this.page.locator("//div[@class='sr-only']/parent::button");
        break;
      case "prod":
        locator = this.page.locator("[data-end-to-end=auto_header_cart]");
        break;
      case "pprod":
        locator = this.page.locator("[data-end-to-end=auto_header_cart]");
        break;
      case "int":
        locator = this.page.locator("//button[@data-end-to-end='auto_header_cart']");
        break;
      case "int.newlook":
        locator = this.page.locator("//button[@data-end-to-end='auto_header_cart']");
        break;
      case "uat.newlook":
        locator = this.page.locator("//div[@class='sr-only']/parent::button");
        break;
      default:
        throw new Error("Unexpected value: " + process.env.NODE_ENV);
    }
    return locator;
  }
}
