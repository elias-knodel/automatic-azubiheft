import { SortedData } from "./interface/SortedData";

export default class Csv {
    constructor(data: SortedData) {
        this.createCsv(data);
    }

    protected createCsv(data: SortedData) {
        data;
        console.log("Generation successfull!");
    }
}