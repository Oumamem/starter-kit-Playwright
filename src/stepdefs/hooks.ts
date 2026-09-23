import * as Cucumber from '@cucumber/cucumber';
import { Page, Locator } from '@playwright/test';

const { After, Before } = Cucumber;

// Before(function () {
  
// }); 

After(async function () {
  await this.page.setDefaultTimeout(10000);
  const screenshotBuffer = await this.page.screenshot({ fullPage: true });
  const screenshotBase64 = await screenshotBuffer.toString('base64');
  await this.attach(screenshotBase64, 'image/png');
  await this.page.close();
});
  





