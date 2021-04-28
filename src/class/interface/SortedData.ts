export interface CsvData {
    [key: string]: SortedDataObject
}

export interface SortedDataObject {
    date: Date,
    class: string,
    topic: string
}
