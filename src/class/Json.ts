import { readFileSync, writeFileSync, existsSync } from "fs";

export default class Json {

    private jsonFile: string;

    constructor(
        jsonFilePath: string
    ) {
        this.jsonFile = jsonFilePath;
    }

    public read() {
        if(!existsSync(this.jsonFile)) {
            this.write({});    
        }
        const jsonData = JSON.parse(readFileSync(this.jsonFile, "utf8"));
        return jsonData;
    }

    public write(jsonContent: unknown) {
        writeFileSync(this.jsonFile, JSON.stringify( jsonContent, null, 2), "utf8");
    }
}