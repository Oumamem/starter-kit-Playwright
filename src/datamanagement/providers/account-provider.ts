import { PropertiesDataProvider } from './fwk/PropertiesDataProvider';
import { ProjectSettings } from '../../setup/ProjectSettings';
import { Account } from '../types/account';

export class AccountProvider extends PropertiesDataProvider<Account> {
  private static INSTANCE: AccountProvider | null = null;

  private constructor() {
    super(ProjectSettings.getProperty('datasource.path.account'));
  }

  public static getInstance(): AccountProvider {
    if (AccountProvider.INSTANCE === null) {
      AccountProvider.INSTANCE = new AccountProvider();
    }
    return AccountProvider.INSTANCE;
  }

  public static LAST_ACCOUNT_REF = 'the.last.account';
  public LAST: Account | null = null;

  public fetch(dataReference: string): Account {
    if (dataReference !== AccountProvider.LAST_ACCOUNT_REF) {
      this.LAST = new Account(
        this.getValue(dataReference, 'email'),
        this.getValue(dataReference, 'password'),
        this.getOptionalValue(dataReference, 'title', '_NA_'),
        this.getOptionalValue(dataReference, 'first.name', '_NA_'),
        this.getOptionalValue(dataReference, 'last.name', '_NA_'),
        this.getOptionalValue(dataReference, 'address.line.1', '_NA_'),
        this.getOptionalValue(dataReference, 'address.line.2', '_NA_'),
        this.getOptionalValue(dataReference, 'postal.code', '_NA_'),
        this.getOptionalValue(dataReference, 'city', '_NA_'),
        this.getOptionalValue(dataReference, 'region.code', '_NA_'),
        this.getOptionalValue(dataReference, 'country.code', '_NA_'),
        this.getOptionalValue(dataReference, 'phone', '_NA_'),
        this.getOptionalValue(dataReference, 'birthdate.day', '_NA_'),
        this.getOptionalValue(dataReference, 'birthdate.month', '_NA_'),
        this.getOptionalValue(dataReference, 'birthdate.year', '_NA_'),
        this.getOptionalValue(dataReference, 'cdc.id', '_NA_'),
        this.getOptionalValue(dataReference, 'area', '_NA_'),
        this.getOptionalValue(dataReference, 'district', '_NA_'),
        this.getOptionalValue(dataReference, 'cegid.customer.code', '_NA_'),
        this.getOptionalValue(dataReference, 'title.text', '_NA_'),
        this.getOptionalValue(dataReference, 'first.name.2', '_NA_'),
        this.getOptionalValue(dataReference, 'last.name.2', '_NA_')
      );
    }
    return this.LAST as Account;
  }
}
