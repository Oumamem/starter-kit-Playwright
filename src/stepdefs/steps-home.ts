// Import Cucumber 
import { Given, When, Then, World } from '@cucumber/cucumber';
// Import pages 
import { HomePage } from '../pages/home-page';
import { LoginPage } from '../pages/login-page';
// Import Providers 
import { AccountProvider } from '../datamanagement/providers/account-provider';
// Import Playwright functions 
import { expect } from 'playwright/test';
// Import Project Settings 
import { ProjectSettings } from '../setup/ProjectSettings';




//=======================================================================================// 
//============================= START STEPS DEFINITIONS =================================// 
//=======================================================================================// 



Given("I will use {string} account", {timeout: 60 * 1000}, async function (accountReference:string) {
    var account = AccountProvider.getInstance().fetch(accountReference);
    this.attach('Email is : ' + account.email);
    this.attach('password is : ' + account.password);
});

Then("I access to the store front", { timeout: 60 * 1000 }, async function () {
     
    var environmentReference = process.env.NODE_ENV || '';
    var localReference = process.env.LOCALE || ''; 
    this.attach('Test RUN on Environement : ' + environmentReference);

    try {
        await this.openUrl(ProjectSettings.DIOR_DOMAIN() + '/' + localReference);

        const homePage = new HomePage(this.page);   
        await new Promise(r => setTimeout(r, 10000));
        
        if (await homePage.forceOtherLocation.isVisible()) {
            await homePage.forceOtherLocation.click();
            console.log('True: geolocalisation');
        } 

        await expect(homePage.cookieDisclaimer).toBeVisible();
        await homePage.acceptAllCookies.click();
        console.log('True: cookies accepted');

        if (await homePage.notificationsPopIn.isVisible()) {
            await homePage.closeNotificationsPopInButton.click();
            console.log('True: notification popin closed');
        }

        await expect(homePage.fashionAndAccessoriesButton).toBeVisible();
        await homePage.fashionAndAccessoriesButton.click();
        console.log('True: fashion and accessories page');
        
        
        await new Promise(r => setTimeout(r, 20000));
        //this.attach(await this.page.screenshot({ fullPage: true }), 'image/png');
        this.attach(await this.page.screenshot({ fullPage: true }), 'image/png');
    } catch (e) {
        throw Error("The access to the store is failed, show exception error : " + e);
    }
});



Given("Add here your scenario", {timeout: 60 * 1000}, async function() {
    
    
});




//=======================================================================================// 
//============================= START FUNCTIONS TO USE ==================================// 
//=======================================================================================// 


async function nameFunction() {
    
};