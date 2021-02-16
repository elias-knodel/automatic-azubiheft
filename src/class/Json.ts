import { readFileSync, writeFileSync, existsSync, writeFile } from "fs";

export default class Json {

    private jsonFile: string;

    constructor(
        jsonFilePath: string
    ) {
        this.jsonFile = jsonFilePath;
    }

    public read() {
        if (!existsSync(this.jsonFile)) {
            this.writeSync({});    
        }
        const jsonData = JSON.parse(readFileSync(this.jsonFile, "utf8"));
        return jsonData;
    }

    public writeSync(jsonContent: unknown) {
        writeFileSync(this.jsonFile, JSON.stringify( jsonContent, null, 2), "utf8");
    }

    public writeAsync(jsonContent: unknown) {
        writeFile(this.jsonFile, JSON.stringify( jsonContent, null, 2), function(err) {
            console.log(err);
        });
    }
}