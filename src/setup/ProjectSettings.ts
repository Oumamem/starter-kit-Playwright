import * as path from 'path';
import * as fs from 'fs';

//import { CustomerData, CustomerScenarios } from '../../resources/datasources/accounts/accounts.fr_fr';

export class ProjectSettings {
    public static LOCALE(): string {
        return ProjectSettings.getProperty('locale');
    }

    public static ENVIRONMENT(): string {
        return process.env.ENVIRONMENT || '';
    }

    public static LOCALE_COUNTRY(): string {
        return ProjectSettings.getProperty('locale.country');
    }

    public static DIOR_DOMAIN(): string {
        return ProjectSettings.getProperty('dior.domain');
    }

    public static API_DIOR_DOMAIN(): string {
        return ProjectSettings.getProperty('api.dior.domain');
    }
    /*
    public static DIOR_DOMAIN(): string {
        return isDiorDomainSetInTheSystem() ? process.env.DIOR_DOMAIN || '' : ProjectSettings.getProperty('dior.domain');
    }*/

    public static VERY_SHORT_DELAY_IN_MS = 500;
    public static SHORT_DELAY_IN_MS = 1000;
    public static SHORT_DELAY_IN_S = 1;
    public static MEDIUM_DELAY_IN_MS = 3000;
    public static MEDIUM_DELAY_IN_S = 3;
    public static LONG_DELAY_IN_MS = 10000;
    public static LONG_DELAY_IN_S = 10;
    public static VERY_LONG_DELAY_IN_MS = 30000;
    public static DEFAULT_RETRY_COUNT = 3;
    public static MEDIUM_RETRY_COUNT = 4;
    public static LONG_RETRY_COUNT = 8;

    private static settings: { [key: string]: string } | null = null;

    public static getProperty(key: string): string {
        if (ProjectSettings.settings === null) {
            ProjectSettings.settings = {};
            ProjectSettings.loadPropertiesFile(ProjectSettings.getGlobalFileName());
            ProjectSettings.loadPropertiesFile(ProjectSettings.getEnvironmentSpecificFileName());
            ProjectSettings.loadPropertiesFile(ProjectSettings.getLocaleSpecificFileName());
            //ProjectSettings.loadPropertiesFile(ProjectSettings.getEnvironmentAndLocalSpecificFileName());
            //ProjectSettings.loadPropertiesFile(ProjectSettings.getAccountFileName());
        }

        return ProjectSettings.settings[key] || '';
    }

    private static loadPropertiesFile(filename: string): void {

        const filePath = path.join(__dirname, filename);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const parsedJson = JSON.parse(fileContent);
        try {
            if (typeof parsedJson === 'object') {
                ProjectSettings.settings = { ...ProjectSettings.settings, ...parsedJson };
            }
        } catch (e) {
            console.error(`Error loading file ${filePath} :`, e);
            // Do nothing
        }
    }

    public static loadAccountsFile(): fs.ReadStream | null {
        try {
            const filePath = path.join(__dirname, 'src/test/resources/datasources/accounts.properties.json');
            return fs.createReadStream(filePath);
        } catch (e) {
            console.error(e);
            return null;
        }
    }

    
    public static getLocaleSpecificFileName(): string {
        return `../../resources/config/project.${process.env.LOCALE}.properties.json`;
    }
    
    public static getAccountFileName(): string {
        return '../../resources/datasources/accounts/accounts.fr_fr.json';
    }

    public static getEnvironmentSpecificFileName(): string {
        return `../../resources/config/project.${process.env.NODE_ENV}.properties.json`;
    }

    public static getEnvironmentAndLocalSpecificFileName(): string {
        return `../../resources/config/project.${process.env.NODE_ENV}.${process.env.LOCALE}.properties.json`;
    }

    public static getGlobalFileName(): string {
        return '../../resources/config/global.properties.json';
    }

    public static isDiorDomainSetInTheSystem(): boolean {
        return process.env.DIOR_DOMAIN !== null && process.env.DIOR_DOMAIN !== undefined && process.env.DIOR_DOMAIN.trim() !== '';
    }
}
