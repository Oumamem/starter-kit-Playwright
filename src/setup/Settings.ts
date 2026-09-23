import * as fs from 'fs';
import * as path from 'path';

export class Settings {

    private static readonly GLOBAL_FILENAME = 'global.properties.ts';
    public static readonly NDEF = 'NDEF';

    private static settings: Record<string, string> | null = null;

    public static getProperty(key: string): string {
        if (Settings.settings === null) {
            Settings.settings = {};
            try {
                const filePath = path.join(__dirname, Settings.GLOBAL_FILENAME);
                const fileContent = fs.readFileSync(filePath, 'utf-8');
                const parsedJson = JSON.parse(fileContent);

                if (typeof parsedJson === 'object' && parsedJson !== null) {
                    Settings.settings = Object.assign(Settings.settings, parsedJson);
                } else {
                    console.error(`Error loading properties from file ${Settings.GLOBAL_FILENAME}: Invalid JSON format`);
                    return Settings.NDEF;
                }
            } catch (error) {
                console.error(`Error loading properties from file ${Settings.GLOBAL_FILENAME}: ${error}`);
                return Settings.NDEF;
            }
        }
        
        return Settings.settings![key] || Settings.NDEF;            
    }
}
