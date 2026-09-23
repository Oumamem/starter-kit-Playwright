export abstract class FallbackedFileDataProvider {
    protected readonly filenames: string[];

    protected constructor(filenames: string[]) {
        this.filenames = filenames;
    }
}
