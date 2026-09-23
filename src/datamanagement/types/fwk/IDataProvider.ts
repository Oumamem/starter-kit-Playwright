export interface IDataProvider<A> {
    fetch(dataReference: string): A;
}
