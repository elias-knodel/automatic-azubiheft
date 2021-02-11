export interface SortedData {
    [key: string]: SortedDataObject
}

export interface SortedDataObject {
    date: Date,
    class: string,
    topic: string
}