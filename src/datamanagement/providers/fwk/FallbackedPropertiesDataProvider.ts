import * as fs from 'fs';
import { Settings } from '../../../setup/Settings';
import { FallbackedFileDataProvider } from './FallbackedFileDataProvider';
import { IDataProvider } from '../../types/fwk/IDataProvider'

export abstract class FallbackedPropertiesDataProvider<A> extends FallbackedFileDataProvider implements IDataProvider<A> {

    private data: Record<string, Record<string, string>> | null = null;
    private fallbackProvider: PropertiesDataProvider<A> | null = null;

    constructor(filenames: string[]) {
        super(filenames);
        this.initializePrimaryProvider(filenames);
        this.initializeFallbackProvider(filenames);
    }

    private initializePrimaryProvider(filenames: string[]): void {
        const primaryFilename = filenames[0];
        if (primaryFilename !== Settings.NDEF) {
            try {
                const fileContent = fs.readFileSync(primaryFilename, 'utf-8');
                this.data = JSON.parse(fileContent);
            } catch (error) {
                throw new Error(`Primary provider: Error loading properties from file ${primaryFilename}: ${error}`);
            }
        }
    }

    private initializeFallbackProvider(filenames: string[]): void {
        if (filenames.length > 1) {
            const fallbackFilenames = filenames.slice(1);
            this.fallbackProvider = new PropertiesDataProvider<A>(fallbackFilenames);
        }
    }

    public abstract fetch(dataReference: string): A;

    protected getValue(dataReference: string, attributeName: string): string {
        if (this.data === null) {
            throw new Error("FallbackedPropertiesDataProvider : Properties data is not set");
        }

        const section = this.data[dataReference];
        if (section) {
            return section[attributeName] || '';
        } else {
            throw new Error(`FallbackedPropertiesDataProvider : Section ${dataReference} not found in the JSON data`);
        }
    }

    protected getOptionalValue(dataReference: string, attributeName: string, defaultValue: string): string {
        try {
            return this.getValue(dataReference, attributeName) || defaultValue;
        } catch (error) {
            console.warn(`FallbackedPropertiesDataProvider : Error getting optional value: ${error}`);
            return defaultValue;
        }
    }

    protected containsValue(dataReference: string, attributeName: string): boolean {
        if (this.data === null) {
            console.warn("FallbackedPropertiesDataProvider : Properties data is not set");
            return false;
        }

        const section = this.data[dataReference];
        return !!section && attributeName in section;
    }
}


export class PropertiesDataProvider<A> extends FallbackedPropertiesDataProvider<A> {
    public fetch(dataReference: string): A {
        throw new Error('Method not implemented.');
    }
    constructor(filenames: string[]) {
        super(filenames);
    }
}

