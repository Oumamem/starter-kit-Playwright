import * as RandomStringUtils from 'randomstring';

/**
 * A user account
 */
export class Account {
    public password: string;
    public email: string;
    public title: string;
    public firstName: string;
    public lastName: string;
    public addressLine1: string;
    public addressLine2: string;
    public postalCode: string;
    public city: string;
    public regionCode: string;
    public countryCode: string;
    public phone: string;
    public birthDateDay: string;
    public birthDateMonth: string;
    public birthDateYear: string;
    public cdcId: string;
    public area: string;
    public district: string;
    public cegidCustomerCode: string;
    public titleText: string;
    public firstName2: string;
    public lastName2: string;

    private static replaceUniqueToken(initialValue: string): string {
        const date = new Date();
        const dateAsString = this.formatDate(date, 'yyMMddhhmmss');
        return initialValue.replace(/#UNIQUETOKEN#/g, dateAsString);
    }

    private static replaceRandomString(initialValue: string): string {
        const randomString = RandomStringUtils.generate({ length: 9, charset: 'alphabetic', capitalization: 'lowercase' });
        return initialValue.replace(/#RANDOMSTRING#/g, randomString);
    }

    private static formatDate(date: Date, format: string): string {
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
        };
    
        const dateFormat = new Intl.DateTimeFormat('en', options);
        return dateFormat.formatToParts(date)
            .map((part) => part.type === 'literal' ? '' : part.value.padStart(2, '0'))
            .join('');
    }

    constructor(email: string, password: string,
                title: string, firstName: string, lastName: string,
                addressLine1: string, addressLine2: string,
                postalCode: string, city: string, regionCode: string, countryCode: string,
                phone: string,
                birthDateDay: string, birthDateMonth: string, birthDateYear: string,
                cdcId: string, area: string, district: string, cegidCustomerCode: string, titleText: string, firstName2: string, lastName2: string) {
        this.password = password;
        this.email = Account.replaceUniqueToken(email);
        this.title = title;
        this.firstName = firstName;
        this.lastName = Account.replaceRandomString(lastName);
        this.addressLine1 = addressLine1;
        this.addressLine2 = addressLine2;
        this.postalCode = postalCode;
        this.city = city;
        this.regionCode = regionCode;
        this.countryCode = countryCode;
        this.phone = phone;
        this.birthDateDay = birthDateDay;
        this.birthDateMonth = birthDateMonth;
        this.birthDateYear = birthDateYear;
        this.cdcId = cdcId;
        this.area = area;
        this.district = district;
        this.cegidCustomerCode = cegidCustomerCode;
        this.titleText = titleText;
        this.firstName2 = firstName2;
        this.lastName2 = lastName2;
    }
}
