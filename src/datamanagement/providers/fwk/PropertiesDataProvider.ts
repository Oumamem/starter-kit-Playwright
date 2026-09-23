import * as fs from 'fs';

import { Settings } from '../../../setup/Settings';

export abstract class PropertiesDataProvider<A> {
    
    protected data: Record<string, Record<string, string>> | null = null;

    constructor(filename: string) {
        if (filename !== Settings.NDEF) {
            try {
                const fileContent = fs.readFileSync(filename, 'utf-8');
                this.data = JSON.parse(fileContent);
            } catch (error) {
                console.error(`Error loading properties from file ${filename}: ${error}`);
            }
        }
    }

    public abstract fetch(dataReference: string);

    protected getValue(dataReference: string, attributeName: string): string {
        if (this.data === null) {
            console.error("Properties data is not set");
            return '';
        }
        
        const section = this.data[dataReference];
        if (section) {
            return section[attributeName] || '';
        } else {
            console.error(`Section ${dataReference} not found in the JSON data`);
            return '';
        }
    }

    protected getOptionalValue(dataReference: string, attributeName: string, defaultValue: string): string {
        try {
            return this.getValue(dataReference, attributeName);
        } catch (error) {
            console.error(`Error getting optional value: ${error}`);
            return defaultValue;
        }
    }

    protected containsValue(dataReference: string, attributeName: string): boolean {
        if (this.data === null) {
            console.error("Properties data is not set");
            return false;
        }

        const section = this.data[dataReference];
        return !!section && attributeName in section;
    }
}