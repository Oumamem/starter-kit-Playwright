import { Page, Cookie } from 'playwright';
import { CookieNotInitializedException } from './CookieNotInitializedException'; // Replace with the actual exception file

export class CookiesUtils {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }
    static async getCookieValue(page: Page, cookieName: string): Promise<string> {
      try {
        const cookies = await page.context().cookies();
        const cookie = cookies.find((c) => c.name === cookieName);
  
        if (cookie) {
          return cookie.value;
        } else {
          throw new CookieNotInitializedException(cookieName, new Error('Cookie not found'));
        }
      } catch (error) {
        console.error('Error getting cookies:', error);
        throw error;
      }
    }
  }
  


