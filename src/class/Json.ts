import { readFileSync } from "fs";

export default class Json {
    public read(jsonFilePath: string) {
        const jsonData = JSON.parse(readFileSync(jsonFilePath, "utf8"));
        return jsonData;
    }
}