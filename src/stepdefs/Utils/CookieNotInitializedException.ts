/*export class CookieNotInitializedException extends Error {
    constructor(cookieName: string, cause?: Error) {
        const errorMessage = `Cookie '${cookieName}' is not initialized`;
        super(cause ? `${errorMessage}: ${cause.message}` : errorMessage);
        Object.setPrototypeOf(this, CookieNotInitializedException.prototype);
    }
}*/

export class CookieNotInitializedException extends Error {
    innerError?: Error; // Add this line to define the innerError property
  
    constructor(cookieName: string, innerError?: Error) {
      super(`CookieNotInitializedException: ${cookieName}`);
      this.name = 'CookieNotInitializedException';
      this.innerError = innerError;
    }
  }

  